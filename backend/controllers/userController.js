const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  // const { name, email, password, cont, loc } = req.body;

  // const { name, email, password, cont } = req.body;
  const { name, email, password, addr, numb } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    addr,
    numb,
    // loc,

    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getOwnerDetails = catchAsyncErrors(async (req, res, next) => {
  // console.log("id check in user controller", req.params.userId);

  const owner = await User.findById(req.params.userId);

  if (!owner) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.userId}`)
    );
  }

  // console.log(owner, "owner in controller");
  // console.log("aaag");
  res.status(200).json({
    success: true,
    owner,
  });
});

// get notifications
exports.getUserNotifications = catchAsyncErrors(async (req, res, next) => {
  // const user = await User.findById(req.body);
  const userId = await User.findById(req.user.id);
  // console.log("notifi controller");
  try {
    // console.log("try block of not controller");
    const products = await Product.find({
      notifyMe: {
        $elemMatch: { user: userId },
      },
    });
    const notifications = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // var note1 = "";
      var note2 = "";
      const n = [];
      if (product.notifyMe && product.notifyMe.length > 0) {
        const p = product._id;
        const notifi = product.notifyMe[product.notifyMe.length - 1];
        if (notifi.sent == true) {
          // if (notifi.info) {
          //   note1 = note1.concat("Reminder Note: ", notifi.info);
          //   n.push(note1);
          // }
          // note2 = note2.concat(
          //   product.name,
          //   " is available on ",
          //   product.availableDates
          // );
          note2 = note2.concat(
            product.name,
            " is available on ",
            product.availableDates.map((item, index, array) => {
              const date = new Date(item.date);
              const dateString = date.toLocaleDateString("en-US", {
                // year: "numeric",
                month: "long",
                day: "numeric",
              });
              if (array.length == 1) {
                return ` ${dateString}`;
              } else if (index === array.length - 1) {
                return ` and ${dateString}`;
              } else if (index === array.length - 2) {
                return ` ${dateString}`;
              } else if (index < array.length - 2) {
                return ` ${dateString} `;
              } else {
                return ` ${dateString}`;
              }
            })
          );
          // console.log(note1);
          // console.log(note2);
          // console.log(p);
          n.push(note2);

          n.push(p); // product.name, " is available on ",
          notifications.push(n);
        }
      }
    }
    // console.log("try block of not controller 2");

    // console.log("noti ", notifications);
    res.status(200).json({
      success: true,
      notifications,
      // user,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Could not get notifications for user");
  }
  // const user = await User.findById(req.user.id);
  // res.status(200).json({
  //   success: true,
  //   user,
  // });
});

// exports.getUserNotifications = catchAsyncErrors(async (req, res, next) => {
//   const userId = await User.findById(req.user.id);
//   console.log("notifi controller");

//   // const userId = req.user.id;
//   try {
//     console.log("try block of not controller");

//     // const products = await Product.find(
//     //   {
//     //     "notifyMe.user": userId,
//     //   },
//     //   {
//     //     "notifyMe.info": 1,
//     //     "notifyMe.sent": 1,
//     //   }
//     // );
//     const products = await Product.find({
//       notifyMe: {
//         $elemMatch: { user: userId },
//       },
//     });

//     const notifications = [];

//     for (let i = 0; i < products.length; i++) {
//       const product = products[i];
//       var note = "";
//       if (product.notifyMe && product.notifyMe.length > 0) {
//         const notifi = product.notifyMe[product.notifyMe.length - 1];
//         if (notifi.sent == false) {
//           if (notifi.info) {
//             note = note.concat("Reminder Note: ", notifi.info, `/n`);
//           }

//           // notifi.info
//           // product.name, " is available on ",

//           const userNotifications = product.notifyMe.filter(
//             (n) => n.user && n.user.equals(userId)
//           );

//           notifications.push(...userNotifications);
//         }
//       }
//     }

//     //   console.log(product.notifyMe[product.notifyMe.length - 1].sent);
//     //   if (product.notifyMe && product.notifyMe.length > 0) {
//     //     const userNotifications = product.notifyMe.filter(
//     //       (n) => n.user && n.user.equals(userId)
//     //     );

//     //     notifications.push(...userNotifications);
//     //   }
//     // }
//     console.log("try block of not controller 2");

//     // console.log(products);
//     // const user = await User.findById(userId);

//     // const notifications = products.flatMap((product) => {
//     //   return product.notifyMe.filter((notification) => {
//     //     return notification.user.equals(userId);
//     //   });
//     // });

//     console.log("noti ", notifications);
//     // res.status(200).json({
//     //   success: true,
//     //   notifications,
//     //   user,
//     // });
//   } catch (err) {
//     console.error(err);
//     throw new Error("Could not get notifications for user");
//   }

//   // console.log("notifi controller");
//   // // data.info
//   // try {
//   //   console.log("try block of not controller");
//   //   // const products = await Product.find(
//   //   //   {
//   //   //     notifyMe: {
//   //   //       $elemMatch: { user: userId },
//   //   //     },
//   //   //   }
//   //   //   // { "notifyMe.info": 1, "notifyMe.sent": 1 }
//   //   // );

//   //   const products = await Product.aggregate([
//   //     {
//   //       $match: { "notifyMe.user": userId },
//   //     },
//   //     {
//   //       // $project: {
//   //       notifyMe: {
//   //         // $filter: {
//   //         //   input: "$notifyMe",
//   //         //   as: "notify",
//   //         //   cond: { $eq: ["$$notify.user", userId] },
//   //         // },
//   //         // },
//   //         _id: 0,
//   //         user: userId,
//   //         info: "",
//   //         sent: false,
//   //       },
//   //     },
//   //   ]);
//   //   // res.status(200).json({
//   //   //   success: true,
//   //   //   notifications: products
//   //   // });

//   //   console.log(products);
//   //   // return product.notifyMe.filter((n) => n.user.equals(userId));
//   // } catch (err) {
//   //   console.log("catch block of not controller");
//   //   console.error(err);
//   //   throw new Error("Could not get notifyMe for user");
//   // }

//   // // res.status(200).json({
//   // //   success: true,
//   // //   user,
//   // // });
//   const user = await User.findById(req.user.id);

//   // console.log("notifi controller", user);
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// add items to fav
exports.addItemsToFavorites = catchAsyncErrors(async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    // Find the user document by user ID
    const user = await User.findById(userId);

    // Check if the product ID already exists in the favorites array
    if (Array.isArray(user.favorites) && user.favorites.includes(productId)) {
      // user.favorites = [];
      return; // Product ID already exists, do nothing
    }

    // Add the product ID to the favorites array
    // user.favorites = [];
    // user.favorites.push(productId);
    user.favorites.push(productId);

    // Save the updated user document
    await user.save();

    console.log(
      `Product ID ${productId} has been added to user ${userId}'s favorites. ${user.favorites}`
    );
  } catch (error) {
    console.error(error);
  }
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    addr: req.body.addr,
    numb: req.body.numb,
    // loc: req.body.loc,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    addr: req.body.addr,
    numb: req.body.numb,
    // loc: req.body.loc,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
