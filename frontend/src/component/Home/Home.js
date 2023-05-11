import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import Caution from "../layout/Cautions/Caution";
import ProductCard from "./ProductCard.js";
import Footer from "../layout/Footer/Footer";
import PremiumProductCard from "./PremiumProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// import React, { Fragment, useState } from "react";
// import "./Header.css";
// import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
// import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
// import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../Product/Products.css";
import axios from "axios";
// import { seDispatch } from "react-redux";
// import {  getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
// import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
import banner3 from "../../images/banner3.jpg";

const categories = [
  "Beauty and Personal Care",
  "Electronics",
  "Home and Kitchen",
  "Men Clothing",
  "Tools and Improvements",
  "Toys",
  "Women Clothing",
];
const Home = ({ user, match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const history = useHistory();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [pro, setPro] = useState([]);
  const fetchPremium = async () => {
    const resu = await axios.get("/api/v1/premium");
    const products = resu.data.products;
    setPro(products);

    //  setPro(await axios.get("/api/v1/favorites"));
    console.log(setPro, "setPro");
    console.log(products, "products");

    // setPro(pro.data.products);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    fetchPremium();
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  let count = filteredProductsCount;
  // const [owner, setOwner] = useState(null);
  // const fetchPremium = async (keyword, currentPage, price, category, ratings) => {
  //   // const result = await getOwnerDetails(product.userId);
  //   const resu = await axios.get(`/api/v1/admin/user2/${product.userId}`);
  //   // console.log(result, "#######result####################");
  //   // console.log(product.userId, "@@@@@@@@@@@@@@@@@@@@@@$$$$$$%%%%%%%%%%%%%%%");
  //   setOwner(await axios.get(`/api/v1/admin/user2/${product.userId}`));
  //   // console.log("rrrrrrrr1", resu);
  //   // console.log("rrrrrrrr2", owner);
  //   // console.log("rrrrrrrr3", setOwner);
  //   const t = resu.data.owner.numb;
  //   setCont(t);
  //   const y = resu.data.owner.addr;
  //   setLoca(y);
  //   // console.log(cont, "this is my cont nnnnnnnnnnnnnnn");
  //   // console.log(loca, "this is my loca sssssssssssssss");

  //   // cont = result.data.owner.numb;
  //   // loca = result.data.owner.addr;
  //   // const loca = result.data.owner.addr;
  //   // console.log(loca);
  // };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="EquipmentalsPk" />

            <>
              {" "}
              <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5">
                  <div className="col-lg-3  d-lg-block">
                    <Caution />
                  </div>

                  <div className="col-lg-9">
                    <div
                      id="header-carousel"
                      style={{ top: "10%" }}
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div
                          className="carousel-item active"
                          style={{ height: "410px" }}
                        >
                          <img
                            className="img-fluid"
                            src={banner1}
                            alt="Image"
                          />
                          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: "700px" }}>
                              <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                Welcome to{" "}
                              </h4>
                              <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                EquipmentalsPk
                              </h3>
                              <a
                                href="/products"
                                className="btn btn-light py-2 px-3"
                              >
                                Rent Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

            <h2
              className="homeHeading"
              style={{ "font-weight": "bold", color: "#333;" }}
            >
              Featured Products
            </h2>
            <div className="row">
              <div className="col-lg-3">
                <div class="list-group" style={{ margin: "0% 10% 0% 10%" }}>
                  <div
                    className="bg-transparent"
                    style={{
                      marginTop: "25%",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      style={{
                        marginBottom: "10px",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                    >
                      Price Range
                    </Typography>
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={25000}
                      style={{ color: "#652D90" }}
                    />

                    <fieldset style={{ marginTop: "20px" }}>
                      <Typography
                        style={{
                          marginBottom: "10px",
                          fontSize: "20px",
                          fontWeight: "600",
                        }}
                      >
                        Ratings
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
                        style={{ color: "#652D90" }}
                      />
                    </fieldset>
                  </div>
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
                </div>
              </div>

              <div className="col-lg-9 container" id="container">
                <div className="products">
                  {pro &&
                    pro
                      .filter((product) => product.premium === "Premium") // filter out non-premium products
                      .sort((a, b) => b.payment - a.payment) // sort by payment in descending order
                      .map((product) => (
                        <PremiumProductCard
                          key={product._id}
                          product={product}
                        />
                      ))}
                </div>
              </div>
            </div>

            <h2
              className="productsHeading"
              style={{ "font-weight": "bold", color: "#333;" }}
            >
              Products
            </h2>

            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>

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

      <Footer />
    </>
  );
};

export default Home;
