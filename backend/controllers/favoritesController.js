const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Get User Detail
// exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// update User Profile
// exports.addItemsToFavorites = catchAsyncErrors(
//   async (req, res, next, userId) => {
//     // Assuming you have a variable named `productId` that contains the ID of the product to be added to the favorites list
//     const userId = req.userId; // Get the user ID from the request object
//     const productId = req.body.productId;
//     try {
//       // Find the user document by user ID
//       const user = await User.findById(userId);

//       // Check if the product ID already exists in the favorites array
//       if (user.favorites.includes(productId)) {
//         return; // Product ID already exists, do nothing
//       }

//       // Add the product ID to the favorites array
//       user.favorites.push(productId);

//       // Save the updated user document
//       await user.save();

//       console.log(
//         `Product ID ${productId} has been added to user ${userId}'s favorites.`
//       );
//     } catch (error) {
//       console.error(error);
//     }

//     // const newUserData = {
//     //   name: req.body.name,
//     //   email: req.body.email,
//     //   addr: req.body.addr,
//     //   numb: req.body.numb,

//     //   favorites: req.body.favorites.append(id),

//     //   // loc: req.body.loc,
//     // };

//     // // if (req.body.avatar !== "") {
//     // //   const user = await User.findById(req.user.id);

//     // //   const imageId = user.avatar.public_id;

//     // //   await cloudinary.v2.uploader.destroy(imageId);

//     // //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     // //     folder: "avatars",
//     // //     width: 150,
//     // //     crop: "scale",
//     // //   });

//     // //   newUserData.avatar = {
//     // //     public_id: myCloud.public_id,
//     // //     url: myCloud.secure_url,
//     // //   };
//     // // }
//     // console.log("fav controller");
//     // console.log(favorites);
//     // const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     //   new: true,
//     //   runValidators: true,
//     //   useFindAndModify: false,
//     // });

//     // res.status(200).json({
//     //   success: true,
//     // });
//   }
// );

// // Get single user (admin)
// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// update User Role -- Admin
// exports.addItemsToFavorites = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//     addr: req.body.addr,
//     numb: req.body.numb,

//     favorites: req.body.favorites.append(id),

//     // loc: req.body.loc,
//   };

//   await User.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Delete User --Admin
// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
//     );
//   }

//   const imageId = user.avatar.public_id;

//   await cloudinary.v2.uploader.destroy(imageId);

//   await user.remove();

//   res.status(200).json({
//     success: true,
//     message: "User Deleted Successfully",
//   });
// });
