import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useState } from "react";
import "../Product/Products.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import banner1 from '../../images/banner1.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Home = ({ user, match }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const history = useHistory();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon />, name: "Products", func: product },
    { icon: <ShoppingCartIcon />, name: "My Products", func: userProduct },

    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }

  function product() {
    history.push("/admin/product");
    console.log("admin func 1");
  }
  function userProduct() {
    history.push("/admin/products");
    console.log("user func 1");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/login");
  }

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="EquipmentalsPk" />



          <> <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
              <div className="col-lg-3 d-none d-lg-block" >
                <div class="list-group" style={{ margin: "0% 10% 0% 10%" }}>
                <div className="bg-transparent" style={{ "marginTop": "25%",  "backgroundColor": "#f5f5f5", "borderRadius": "10px" }}>
                    <Typography style={{ "marginBottom": "10px", "fontSize": "20px", "fontWeight": "600" }}>Price Range</Typography>
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={25000}
                      style={{ "color": "#652D90" }}
                    />

                    <fieldset style={{ "marginTop": "20px" }}>
                      <Typography style={{ "marginBottom": "10px", "fontSize": "20px", "fontWeight": "600" }}>Ratings</Typography>
                      <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                        style={{ "color": "#652D90" }}
                      />
                    </fieldset>
                  </div>
                  <FormControl>
                    <InputLabel id="category-dropdown" style={{ "font-weight": "bold", "color": "#333;" }}>Categories</InputLabel>
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
              <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-transparent navbar-light py-3 py-lg-0 px-0">
                  <a href className="text-decoration-none d-block d-lg-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1"></span></h1>
                  </a>
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div className="navbar-nav mr-auto py-0">
                      <a className="nav-item nav-link " onClick={userProduct} style={{ "font-weight": "bold", "color": "#333;" }}>Dashboard</a>
                      <a className="nav-item nav-link" onClick={product} style={{ "font-weight": "bold", "color": "#333;" }}>Post Product</a>
                      <a href="/me/update" className="nav-item nav-link" style={{ "font-weight": "bold", "color": "#333;" }}>Update Profile</a>
                      <a className="nav-item nav-link" onClick={logoutUser} style={{ "font-weight": "bold", "color": "#333;" }}>Logout</a>
                    </div>

                  </div>
                </nav>
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active" style={{ height: '410px' }}>
                      <img className="img-fluid" src={banner1} alt="Image" />
                      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: '700px' }}>
                          <h4 className="text-light text-uppercase font-weight-medium mb-3">Welcome to </h4>
                          <h3 className="display-4 text-white font-weight-semi-bold mb-4">EquipmentalsPk</h3>
                          <a href="/products" className="btn btn-light py-2 px-3">Rent Now</a>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item" style={{ height: '410px' }}>
                      <img className="img-fluid" src={banner2} alt="Image" />
                      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: '700px' }}>
                          <h4 className="text-light text-uppercase font-weight-medium mb-3">Welcome to</h4>
                          <h3 className="display-4 text-white font-weight-semi-bold mb-4">EquipmentalsPk</h3>
                          <a href className="btn btn-light py-2 px-3">Rent Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                    <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                      <span className="carousel-control-prev-icon mb-n2" />
                    </div>
                  </a>
                  <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                    <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                      <span className="carousel-control-next-icon mb-n2" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          </>








          <h2 className="homeHeading" style={{ "font-weight": "bold", "color": "#333;" }}>Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <h2 className="productsHeading" style={{ "font-weight": "bold", "color": "#333;" }}>Products</h2>

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
  );
};

export default Home;
