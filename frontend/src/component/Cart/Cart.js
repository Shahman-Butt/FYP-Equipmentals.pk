// import React, { Fragment, useEffect } from "react";
// import "./Cart.css";
// import CartItemCard from "./CartItemCard";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
// import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
// import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import SideBar from "../Admin/Sidebar.js";
// import { DataGrid } from "@material-ui/data-grid";

// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
//   getFavorites,
// } from "../../actions/productAction";

// const Cart = ({ history }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { cartItems } = useSelector((state) => state.cart);
//   const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );
//   const { user } = useSelector((state) => state.user);

//   // del product from favorites array
//   // const deleteProductHandler = (id) => {
//   //   dispatch(deleteProduct(id));
//   // };

//   // const increaseQuantity = (id, quantity, stock) => {
//   //   console.log("test");
//   //   const newQty = quantity + 1;
//   //   if (stock <= quantity) {
//   //     return;
//   //   }
//   //   dispatch(addItemsToCart(id, newQty));
//   // };

//   // const decreaseQuantity = (id, quantity) => {
//   //   const newQty = quantity - 1;
//   //   if (1 >= quantity) {
//   //     return;
//   //   }
//   //   dispatch(addItemsToCart(id, newQty));
//   // };

//   const deleteCartItems = (id) => {
//     dispatch(removeItemsFromCart(id));
//   };

//   // const checkoutHandler = () => {
//   //   history.push("/login?redirect=shipping");
//   // };
//   useEffect(() => {
//     // if (error) {
//     //   alert.error(error);
//     //   dispatch(clearErrors());
//     // }

//     // if (deleteError) {
//     //   alert.error(deleteError);
//     //   dispatch(clearErrors());
//     // }

//     // if (isDeleted) {
//     //   alert.success("Product Deleted Successfully");
//     //   history.push("/admin/dashboard");
//     //   dispatch({ type: DELETE_PRODUCT_RESET });
//     // }

//     dispatch(getFavorites());
//   }, [dispatch, alert, error, deleteError, history, isDeleted]);

//   // const columns = [
//   //   { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

//   //   {
//   //     field: "name",
//   //     headerName: "Name",
//   //     minWidth: 150,
//   //     flex: 0.5,
//   //   },
//   //   {
//   //     field: "availability",
//   //     headerName: "Availability",

//   //     minWidth: 150,
//   //     flex: 0.5,
//   //   },
//   //   {
//   //     field: "price",
//   //     headerName: "Price",
//   //     type: "number",
//   //     minWidth: 150,
//   //     flex: 0.3,
//   //   },

//   //   {
//   //     field: "actions",
//   //     flex: 0.5,
//   //     headerName: "Actions",
//   //     minWidth: 150,
//   //     type: "number",
//   //     sortable: false,
//   //     renderCell: (params) => {
//   //       return (
//   //         <Fragment>
//   //           {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
//   //             <EditIcon />
//   //           </Link>

//   //           <Button
//   //             onClick={() =>
//   //               deleteProductHandler(params.getValue(params.id, "id"))
//   //             }
//   //           >
//   //             <DeleteIcon />
//   //           </Button> */}
//   //         </Fragment>
//   //       );
//   //     },
//   //   },
//   // ];

//   // const rows = [];

//   return (
//     // <Fragment>
//     //   {cartItems.length === 0 ? (
//     //     <div className="emptyCart">
//     //       <RemoveShoppingCartIcon />

//     //       <Typography>No Product in Your Favorites</Typography>
//     //       <Link to="/products">View Products</Link>
//     //     </div>
//     //   ) : (
//     //     <Fragment>
//     //       <div className="cartPage">
//     //         <div className="cartHeader">
//     //           <p>Products</p>
//     //         </div>

//     //         {cartItems &&
//     //           cartItems.map((item) => (
//     //             <div className="cartContainer" key={item.product}>
//     //               <CartItemCard item={item} deleteCartItems={deleteCartItems} />
//     //             </div>
//     //           ))}
//     //       </div>
//     //     </Fragment>
//     //   )}
//     // </Fragment>

//     <Fragment>
//       <MetaData title={`Favorite PRODUCTS - User`} />

//       {/* <div className="dashboard row" style={{ height: "1%" }}> */}
//       {/* <SideBar /> */}
//       {/* <div
//           className="productListContainer col-md-9"
//           style={{ height: "0%", width: "70%" }}
//         >
//           <h1 id="productListHeading">Favorite PRODUCTS</h1> */}
//       {/* <p> User Id: {String(user._id)}</p> */}
//       {/* <p style={{ margin: "10px 0 5px 0", fontWeight: "bold" }}>User ID:</p>
//           <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
//             {String(user._id)}
//           </p> */}

//       {/* <div className="user-id-container">
//         <label className="user-id-label">User ID:</label>
//         <input type="text" value={user._id} className="user-id-field" />
//       </div> */}
//       {/* <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             className="productListTable"
//             autoHeight
//           /> */}
//       {/* </div> */}
//       {/* </div> */}
//     </Fragment>
//   );
// };

// export default Cart;

import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getFavorites,
  deleteFavorites,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Cart = ({ match }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const handleDeleteFavorite = (id) => {
    dispatch(deleteFavorites(user._id, id));
    alert.success("Item Removed from Favorites");

    setTimeout(() => {
      window.location.href = "/favorites";
    }, 1000);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getFavorites(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Favorites -- EquipmentalsPk" />
          <>
            {" "}
            <div className="container-fluid mb-5">
              <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                  <div class="list-group" style={{ margin: "0% 10% 0% 10%" }}>
                    <FormControl>
                      <InputLabel
                        id="category-dropdown"
                        style={{ "font-weight": "bold", color: "#333;" }}
                      >
                        Categories
                      </InputLabel>
                      <Select
                        labelId="category-dropdown"
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="" style={{ marginTop: "100%" }}>
                      <Typography>Price</Typography>
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                      />

                      <fieldset>
                        <Typography component="legend">
                          Ratings Above
                        </Typography>
                        <Slider
                          value={ratings}
                          onChange={(e, newRating) => {
                            setRatings(newRating);
                          }}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          min={0}
                          max={5}
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 d-none d-lg-block">
                  <>
                    <h2 className="productsHeading">Favorites</h2>
                    <p> User Id: {String(user._id)}</p>
                    <div className="products">
                      {products &&
                        products.map((product) => (
                          <div>
                            <ProductCard key={product._id} product={product} />
                            <button
                              onClick={() => handleDeleteFavorite(product._id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                    </div>
                  </>
                </div>
              </div>
            </div>
          </>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
