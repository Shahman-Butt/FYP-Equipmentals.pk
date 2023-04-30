const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { isAuthenticatedUser } = require("../middleware/auth");
const moment = require("moment-timezone");
// const { user } = useSelector((state) => state.user);
// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let availableDates = [];

  // if (typeof req.body.availableDates === "string") {
  //   availableDates.push(req.body.availableDates);
  // } else {
  //   availableDates = req.body.availableDates;
  // }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  console.log(typeof req.body.availableDates);
  console.log(req.body.availableDates);
  // availableDates = req.body.availableDates.split(",");
  console.log(" #############################");
  availableDates = JSON.parse(req.body.availableDates);
  console.log(typeof availableDates);
  console.log(availableDates);
  console.log(" ###############JSON##############");
  // availableDates = req.body.availableDates.map(
  //   (dateString) => new Date(dateString)
  // );

  // availableDates = availableDates.map((str) => new Date(str));
  // console.log(availableDates);
  // console.log(typeof availableDates);
  console.log(" ############## MAP to STR ###############");
  // availableDates = availableDates.map((dateString) => ({
  //   date: new Date(dateString),
  // }));

  availableDates = availableDates.map((dateString) =>
    moment.tz(dateString, "ddd MMM DD YYYY", "UTC")
  );

  // Convert Moment.js objects back to Date objects
  availableDates = availableDates.map((momentObj) => ({
    date: momentObj.toDate(),
  }));
  console.log(availableDates);
  console.log(" ############ DATE STR #################");
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  req.body.availableDates = availableDates;
  console.log(req.body.availableDates);
  console.log(req.body.images);
  console.log(req.body.category);
  console.log(req.body.user);

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(
    Product.find({ archive: "Not Archived" }),
    req.query
  )
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin or User)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user._id;
  console.log("I am here", user_id);

  const person = await User.findOne({ _id: user_id });
  console.log("I am ", person.role);
  if (person.role === "user") {
    const products = await Product.find({ userId: user_id });
    console.log("user side");
    console.log(products);
    res.status(200).json({
      success: true,
      products,
    });
  } else {
    const products = await Product.find();
    console.log("admin side");
    res.status(200).json({
      success: true,
      products,
    });
  }
});

// get fav
exports.getFavorites = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user._id;
  const person = await User.findOne({ _id: user_id });
  const productIds = person.favorites.map((favorite) => favorite.toString());
  console.log("I am here in favs", user_id);
  console.log("I am user");
  console.log(productIds);
  console.log("user side");
  const products = await Product.find({ _id: { $in: productIds } });
  // console.log(products);

  res.status(200).json({
    success: true,
    products,
  });
});

// get archived
exports.getArchives = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const user_id = req.user._id;
  let products; // declare the variable outside the if...else block
  const person = await User.findOne({ _id: user_id });
  if (person.role === "user") {
    const apiFeature = new ApiFeatures(
      Product.find({ userId: user_id, archive: "Archived" }),
      req.query
    )
      .search()
      .filter();
    products = await apiFeature.query; // assign value inside the block
    const filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } else {
    const apiFeature = new ApiFeatures(
      Product.find({ archive: "Archived" }),
      req.query
    )
      .search()
      .filter();
    products = await apiFeature.query; // assign value inside the block
    const filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  }
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  // if (isAuthenticatedUser(req) === false){}
  // if (LOGIN_FAIL === "LOGIN_FAIL") {
  //   console.log("not logged in");
  //   // alert.error("Login to View Product Details");
  //   // history.push("/login");
  //   // res.redirect("/login");
  // next();
  // } else {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });

  console.log("product deatils in product controller");
  // }
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let availableDates = [];
  console.log(typeof req.body.availableDates);
  console.log(req.body.availableDates);

  console.log(" ###############b  UPDATE ##############");
  availableDates = JSON.parse(req.body.availableDates);
  console.log(typeof availableDates);
  console.log(availableDates);
  console.log(" ############# JSON UPDATE ################");
  // availableDates = availableDates.map((str) => new Date(str));
  // console.log(availableDates);
  // console.log(typeof availableDates);
  // console.log(" ############ MAP to STR UPDATE #################");
  // availableDates = availableDates.map((dateString) => ({
  //   date: new Date(dateString),
  // }));

  availableDates = availableDates.map((dateString) =>
    moment.tz(dateString, "ddd MMM DD YYYY", "UTC")
  );

  // Convert Moment.js objects back to Date objects
  availableDates = availableDates.map((momentObj) => ({
    date: momentObj.toDate(),
  }));
  console.log(availableDates);
  console.log(" ########### DATE STR UPDATE##################");
  req.body.availableDates = availableDates;
  // if (availableDates !== "" && product.notifyme !== null) {
  //   console.log("y");
  // }

  if (availableDates.length > 0 && product.notifyMe.length > 0) {
    // update sent to true for each object in notifyme array
    Product.updateMany(
      { _id: product._id, "notifyMe.sent": false }, // update only if sent is false
      { $set: { "notifyMe.$[].sent": true } } // set sent to true for all elements of the notifyMe array
    ).exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  } else {
    Product.updateMany(
      { _id: product._id, "notifyMe.sent": true }, // update only if sent is false
      { $set: { "notifyMe.$[].sent": false } } // set sent to true for all elements of the notifyMe array
    ).exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Update archive status

exports.updateArchiveStatus = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Premium Product

exports.premiumProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Notify me
// exports.notifyMe = catchAsyncErrors(async (req, res, next) => {
//   console.log("NOTIFY ME");
//   const { productId, userId } = req.body;

//   const notify = {
//     user: req.userId,
//     // name: req.user.name,
//     // rating: Number(rating),
//     // comment,
//   };
//   s;
//   const product = await Product.findById(productId);

//   const isNotified = product.noti.find(
//     (rev) => rev.user.toString() === req.userId.toString()
//   );

//   if (isNotified) {
//     product.noti.forEach((rev) => {
//       if (
//         rev.user.toString() === req.userId.toString()
//         // (rev.rating = rating), (rev.comment = comment)
//       );
//     });
//   } else {
//     product.noti.push(notify);
//     // product.numOfReviews = product.reviews.length;
//   }

//   // let avg = 0;

//   // product.reviews.forEach((rev) => {
//   //   avg += rev.rating;
//   // });

//   // product.ratings = avg / product.reviews.length;

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// exports.notifyMe = catchAsyncErrors(async (req, res, next) => {
//   const { productId, userId } = req.body;

//   const notify = {
//     user: req.userId,
//   };

//   const product = await Product.findById(req.params.id);

//   const isNotified = product.notify.find(
//     (rev) => rev.user.toString() === req.userId.toString()
//   );

//   if (isNotified) {
//     product.notify.forEach((rev) => {
//       if (rev.user.toString() === req.userId.toString());
//     });
//   } else {
//     product.notify.push(notify);
//   }

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// exports.notifyMe = catchAsyncErrors(async (req, res, next) => {
//   console.log("notify me");
//   const { userId } = req.body;

//   const notify = {
//     user: userId,
//   };

//   const product = await Product.findById(req.params.id);

//   const isNotified = product.notify.find(
//     (rev) => rev.user.toString() === userId.toString()
//   );

//   if (isNotified) {
//     product.notify.forEach((rev) => {
//       if (rev.user.toString() === userId.toString());
//     });
//   } else {
//     product.notify.push(notify);
//   }

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

exports.createProductNotification = catchAsyncErrors(async (req, res, next) => {
  const { info, productId } = req.body;

  const notification = {
    user: req.user._id,
  };

  const product = await Product.findById(productId);

  const isStored = product.notifyMe.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isStored) {
    product.notifyMe.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString());
    });
  } else {
    product.notifyMe.push(notification);
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  console.log("controller");
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Delete item from favorites
exports.deleteFavorites = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(req.query.userId);
  const user = await User.findById(req.query.userId);

  console.log(
    "delete favorites: userId: ",
    user._id,
    "and productID: ",
    product._id
  );
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: product._id } },
      { new: true }
    );
    console.log("User updated successfully:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
  // if (!product) {
  //   return next(new ErrorHander("Product not found", 404));
  // }

  // const reviews = product.reviews.filter(
  //   (rev) => rev._id.toString() !== req.query.id.toString()
  // );

  // let avg = 0;

  // reviews.forEach((rev) => {
  //   avg += rev.rating;
  // });

  // let ratings = 0;

  // if (reviews.length === 0) {
  //   ratings = 0;
  // } else {
  //   ratings = avg / reviews.length;
  // }

  // const numOfReviews = reviews.length;

  // await Product.findByIdAndUpdate(
  //   req.query.productId,
  //   {
  //     reviews,
  //     ratings,
  //     numOfReviews,
  //   },
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // );

  res.status(200).json({
    success: true,
  });
});

// put avail product

// exports.createAvailProduct = catchAsyncErrors(async (req, res) => {
//   const { id } = req.params;
//   const { unavailableDates } = req.body;

//   try {
//     const product = await Product.findByIdAndUpdate(
//       id,
//       { unavailableDates },
//       { new: true }
//     );
//     res.status(200).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// get avail product

// exports.getAvailProduct = catchAsyncErrors(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await Product.findById(id);
//     res.status(200).json(product.unavailableDates);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
