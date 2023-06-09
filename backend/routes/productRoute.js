const express = require("express");
const {
  getAllProducts,
  getRecommendedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  createProductNotification,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getFavorites,
  getPremium,
  getArchives,
  deleteFavorites,
  premiumProduct,
  updateArchiveStatus,
  getUserProducts,
  getAvailProduct,
  createAvailProduct,
  notifyMe,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products1/:id").get(getRecommendedProducts);

router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);

// router.route("/user/products").get(isAuthenticatedUser, getUserProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);
// Update a product by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     });
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

// router.route("/product/:id").get(isAuthenticatedUser, getProductDetails);
router.route("/product/:id").get(getProductDetails);
// router.put("admin/notify/:id", async (req, res) => {
//   const { userId } = req.body;
//   console.log("userId", userId);
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

// Update unavailable dates for a product
router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { unavailableDates } = req.body;

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the unavailable dates for the product
    product.unavailableDates = unavailableDates;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router
  .route("/admin/premiumproduct/:id")
  .put(isAuthenticatedUser, premiumProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/notification")
  .put(isAuthenticatedUser, createProductNotification);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
router
  .route("/favorites")
  .get(isAuthenticatedUser, getFavorites)
  .delete(isAuthenticatedUser, deleteFavorites);

router.route("/premium").get(getPremium);
// .delete(isAuthenticatedUser, deleteFavorites);

router.route("/archives").get(isAuthenticatedUser, getArchives);
router.route("/archives/:id").put(isAuthenticatedUser, updateArchiveStatus);
// .put(isAuthenticatedUser, editArchives);

// router
// .route("/admin/archiveproduct/:id")
// .put(isAuthenticatedUser, updateArchiveStatus);
// .delete(isAuthenticatedUser, deleteProduct);

// router
//   .route("/products/:id/availability")
//   // .route("/products/:id/availability")
//   // .put(isAuthenticatedUser, createAvailProduct)
//   .get(isAuthenticatedUser, getAvailProduct);

module.exports = router;

// const express = require("express");
// const {
//   getAllProducts,
//   getRecommendedProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductDetails,
//   createProductReview,
//   createProductNotification,
//   getProductReviews,
//   deleteReview,
//   getAdminProducts,
//   getFavorites,
//   getArchives,
//   deleteFavorites,
//   premiumProduct,
//   updateArchiveStatus,
//   getUserProducts,
//   getAvailProduct,
//   createAvailProduct,
//   notifyMe,
// } = require("../controllers/productController");
// const { isAuthenticatedUser } = require("../middleware/auth");

// const router = express.Router();

// router.route("/products").get(getAllProducts);
// router.route("/products1/:id").get(getRecommendedProducts);

// router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);

// router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, updateProduct)
//   .delete(isAuthenticatedUser, deleteProduct);

// router.route("/product/:id").get(getProductDetails);

// router.put("/product/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { unavailableDates } = req.body;

//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     product.unavailableDates = unavailableDates;
//     await product.save();

//     res.status(200).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router
//   .route("/admin/premiumproduct/:id")
//   .put(isAuthenticatedUser, premiumProduct);

// router.route("/review").put(isAuthenticatedUser, createProductReview);
// router
//   .route("/notification")
//   .put(isAuthenticatedUser, createProductNotification);

// module.exports = router;
