import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateArchiveStatus,
  getArchives,
} from "../../actions/productAction";
import SideBar from "../Admin/Sidebar";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
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

const Arc = ({ match }) => {
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
  // const url = `/admin/product/${match.params.getValue(match.params.id, "id")}`;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const handleEditArchive = (id) => {
    dispatch(updateArchiveStatus(id));

    setTimeout(() => {
      window.location.href = `/archives/${id}`;
    }, 1000);
    // alert.success("Product Archive Status Updated Succesfully");
  };

  // const handleDeleteFavorite = (id) => {
  //   dispatch(deleteFavorites(user._id, id));
  //   alert.success("Item Removed from Favorites");

  //   setTimeout(() => {
  //     window.location.href = "/favorites";
  //   }, 1000);
  // };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getArchives(keyword, currentPage, price, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    alert,
    error,
    // url,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Archives -- EquipmentalsPk" />
          <>
            {" "}
            <div className="container-fluid mb-5">
              <div className="row border-top px-xl-5" style={{ "height": "1%" }}>
              <SideBar />
              
                <div className="col-lg-9 d-none d-lg-block">
                  <>
                    <h2 className="productsHeading">Archives</h2>
                    {/* <p> User Id: {String(user._id)}</p> */}
                    <div className="products">
                      {products &&
                        products.map((product) => (
                          <div>
                            <ProductCard key={product._id} product={product} />
                            {/* <Link
                              to={url}
                              // {`/admin/product/${match.params.getValue(
                              //   match.params.id,
                              //   "id"
                              // )}`}
                            >
                              <EditIcon />
                            </Link> */}
                            <button
                              onClick={() => handleEditArchive(product._id)}
                            >
                              Edit
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

export default Arc;
