
import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import SideBar from "../Admin/Sidebar";
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
  "Beauty and Personal Care",
  "Electronics",
  "Home and Kitchen",
  "Men Clothing",
  "Tools and Improvements",
  "Toys",
  "Women Clothing",
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
              <div className=" border-top px-xl-5 dashboard row" style={{ "height": "1%" }}>
              
                <SideBar />
              
                <div className="col-lg-9 d-none d-lg-block">
                  <>
                    <h2 className="productsHeading">Favorites</h2>
                    {/* <p> User Id: {String(user._id)}</p> */}
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
