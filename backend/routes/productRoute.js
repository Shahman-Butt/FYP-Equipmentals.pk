const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getFavorites,
  deleteFavorites,
  getUserProducts,
  getAvailProduct,
  createAvailProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

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

// router.route("/product/:id").put(updateProductDetails);

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

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
router
  .route("/favorites")
  .get(isAuthenticatedUser, getFavorites)
  .delete(isAuthenticatedUser, deleteFavorites);
// router
//   .route("/products/:id/availability")
//   // .route("/products/:id/availability")
//   // .put(isAuthenticatedUser, createAvailProduct)
//   .get(isAuthenticatedUser, getAvailProduct);

module.exports = router;
