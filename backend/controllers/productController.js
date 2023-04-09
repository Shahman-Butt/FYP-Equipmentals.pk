const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { isAuthenticatedUser } = require("../middleware/auth");

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

  availableDates = JSON.parse(req.body.availableDates);
  console.log(typeof availableDates);
  console.log(availableDates);

  // availableDates = req.body.availableDates.map(
  //   (dateString) => new Date(dateString)
  // );

  availableDates = availableDates.map((str) => new Date(str));
  console.log(availableDates);
  console.log(typeof availableDates);

  availableDates = availableDates.map((dateString) => ({
    date: new Date(dateString),
  }));

  console.log(availableDates);

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
    Product.find({ availability: "Available" }),
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

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const user_id = req.user._id;
  console.log("I am here", user_id);

  const person = await User.findOne({ _id: user_id });
  console.log("I am ", person.role);
  if (person.role === "user") {
    const products = await Product.find({ userId: user_id });
    console.log("user side");
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

// // Get All Product (User)
// exports.getUserProducts = catchAsyncErrors(async (req, res, next) => {
//   console.log("user func 2");
//   const user_id = req.user._id;
//   console.log("user_id:", user_id);
//   const role = await User.find({}, { projection: { role: 1 } });

//   const products = await Product.find({ userId: user_id });

//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

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

  availableDates = JSON.parse(req.body.availableDates);
  console.log(typeof availableDates);
  console.log(availableDates);

  availableDates = availableDates.map((str) => new Date(str));
  console.log(availableDates);
  console.log(typeof availableDates);

  availableDates = availableDates.map((dateString) => ({
    date: new Date(dateString),
  }));

  console.log(availableDates);

  req.body.availableDates = availableDates;
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
