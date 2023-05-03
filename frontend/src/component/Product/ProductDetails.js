import "../Product/Products.css";
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";
import { getRecommendedProduct } from "../../actions/productAction";
import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  clearErrors,
  getProductDetails,
  newReview,
  newNotification,
  deleteFavorites,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";

import { FavoriteBorder, Favorite } from "@material-ui/icons";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { addItemsToFavorites } from "../../actions/userAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { NEW_NOTIFICATION_RESET } from "../../constants/productConstants";
import CalendarCard from "./CalendarCard";
import { notifyMe } from "../../actions/productAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const productId = match.params.id;
  const [cont, setCont] = useState(0);
  const [loca, setLoca] = useState("");
  // let cont = 0;
  // let loca = "";
  // console.log("productId", productId);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // const { owner = {} } = useSelector((state) => state.ownerDetailsReducer);
  // console.log("ownerrrrrrrrrrrrrr", owner);

  // const { succes, error: notificationError } = useSelector(
  //   (state) => state.newNotification
  // );
  // const [owner, setOwner] = useState(null);
  // const { owner } = useSelector((state) => state.ownerDetailsReducer);

  const state = useSelector((state) => state);
  console.log(state, "state");

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  let pim = "";
  let imgURL = "";
  // let l = product;
  // console.log("l", l);

  // console.log("l", l.images.length);
  // console.log("type of l", typeof l);
  // console.log("obj chk", Object.keys(l).length);
  // let imgURL = require("../../images/banner2.jpg").default;
  if (product.im) {
    // console.log("product.im", product.im);
    pim = product.im;
    try {
      imgURL = require(`../../images/${pim}`).default;
      // console.log(pim, "pim");

      // console.log("pim imgurl", imgURL);
    } catch (error) {
      // console.log(`Failed to load image: ${pim}`, error);
    }
    // //  imgURL = require(pim).default;
    // const i = require(`../../${pim}`).default;
    // console.log(pim, "pim");
    // console.log("pim imgurl", i);
  } else if (product.images) {
    // console.log("imgURL   ", imgURL);
    // console.log("product.images", product.images.length);
  } else {
    // console.log("not working");
  }

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // console.log("usename", user.name);
  const [buttonText, setButtonText] = useState("Notify Me When Available");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [owner, setOwner] = useState(null);
  const fetchOwner = async (product) => {
    // const result = await getOwnerDetails(product.userId);
    const resu = await axios.get(`/api/v1/admin/user2/${product.userId}`);
    // console.log(result, "#######result####################");
    console.log(product.userId, "@@@@@@@@@@@@@@@@@@@@@@$$$$$$%%%%%%%%%%%%%%%");
    setOwner(await axios.get(`/api/v1/admin/user2/${product.userId}`));
    console.log("rrrrrrrr1", resu);
    console.log("rrrrrrrr2", owner);
    console.log("rrrrrrrr3", setOwner);
    const t = resu.data.owner.numb;
    setCont(t);
    const y = resu.data.owner.addr;
    setLoca(y);
    console.log(cont, "this is my cont nnnnnnnnnnnnnnn");
    console.log(loca, "this is my loca sssssssssssssss");

    // cont = result.data.owner.numb;
    // loca = result.data.owner.addr;
    // const loca = result.data.owner.addr;
    // console.log(loca);
  };

  // console.log(owner.data.owner.numb, "$$$$$$$$$$$$$$$$$$$$$$$");
  // console.log(owner.data.owner.addr, "#########################");
  // console.log(cont, "++++++++++++++++++");
  // console.log(loca, "))))))))))))");

  const addToFavoritesHandler = (history) => {
    if (isFavorite) {
      handleDeleteFavorite(product._id);
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      const myForm1 = new FormData();
      const userId = user._id;
      myForm1.set("productId", match.params.id);
      myForm1.set("userId", userId);
      dispatch(addItemsToFavorites(myForm1));
      alert.success("Item Added To Favorites");
    }
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const submitNotificationToggle = () => {
    notificationSubmitHandler();
    setButtonText("You will be Notified");
    setButtonDisabled(true);
    alert.success("You will be Notified");
  };
  const handleDeleteFavorite = (id) => {
    dispatch(deleteFavorites(user._id, id));

    setIsFavorite(false);
    alert.success("Item Removed from Favorites");
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
    // console.log(myForm);
  };
  const notificationSubmitHandler = () => {
    const myForm2 = new FormData();

    myForm2.set("productId", match.params.id);

    dispatch(newNotification(myForm2));

    // console.log(myForm2);
  };
  // Recommended
  const { products } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = match.params.keyword;

  const { resultPerPage, filteredProductsCount, productsCount } = useSelector(
    (state) => state.products
  );
  const Cluster = product.Cluster;
  const id = product._id;
  // console.log(Cluster, "cluster");
  let count = filteredProductsCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    fetchOwner(product);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // dispatch(getProduct(keyword, currentPage));
    dispatch(getRecommendedProduct(id, Cluster));
  }, [dispatch, product, Cluster, keyword, alert, error, productId]);

  // recommended close

  useEffect(() => {
    if (user && user.favorites) {
      // console.log(user.favorites);
      const isFav = user.favorites.some((favorite) => favorite === product._id);
      setIsFavorite(isFav ? true : false);
    }
  }, [user, product]);

  useEffect(() => {
    // console.log(
    //   "######################################### IMP ######################"
    // );
    if (product && product.notifyMe) {
      // console.log(product.notifyMe, "product.notifyMe");
      // console.log("user ID ########", user._id);

      const isNoti = product.notifyMe.some((noti) => noti.user === user._id);
      // console.log("user noti ########", isNoti);
      setButtonText(
        isNoti ? "You will be Notified" : "Notify Me When Available"
      );
      isNoti ? setButtonDisabled(true) : setButtonDisabled(false);
    }
  }, [user, product]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   // dispatch(getProduct(keyword, currentPage));
  //   // console.log(" owner id", product.userId);
  //   dispatch(getOwnerDetails(product.userId));
  // }, [dispatch, Cluster, keyword, alert, error, productId]);
  // const [setLoading] = useState(true);

  // useEffect(() => {
  //   dispatch(getOwnerDetails(product.userId)).then((res) => {
  //     setOwner(res.data.owner);
  //     setLoading(true);
  //   });
  // }, [dispatch, product.userId]);

  // console.log(setOwner);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails bg-transparent">
            {!product.im ? (
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
            ) : (
              <img src={imgURL} alt={product.name} />
            )}

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                {/* <p>Product # {product._id}</p> */}
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs. ${product.price} per day`}</h1>
              </div>
              {owner && (
                <div>
                  {" "}
                  {/* <div className="detailsBlock-3"> */}
                  <div className="detailsBlock-4">
                    <div>
                      Contact: {cont}
                      <br></br>Location: {loca}
                    </div>
                  </div>
                </div>
              )}
              <div className="detailsBlock-3">
                <hr></hr>{" "}
                <>
                  {product.availableDates && product.availableDates[0] ? (
                    <>
                      <div className="detailsBlock-3">
                        <h1>Available Dates</h1>{" "}
                      </div>
                      <div className="calendar">
                        {product.availableDates &&
                          product.availableDates.map((cal) => (
                            <CalendarCard key={cal.date} cal={cal} />
                          ))}
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="noCalendar">No Available Dates</p>
                      <button
                        onClick={submitNotificationToggle}
                        className={`submitReview ${
                          buttonDisabled ? "disabled" : ""
                        }`}
                        disabled={buttonDisabled}
                      >
                        {buttonText}
                      </button>
                    </div>
                  )}
                </>
              </div>
              <span>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>

                <button
                  onClick={addToFavoritesHandler}
                  style={{
                    color: "#652D90",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid transparent",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  {isFavorite ? (
                    <Favorite fontSize="large" style={{ color: "#652D90" }} />
                  ) : (
                    <FavoriteBorder
                      fontSize="large"
                      style={{
                        color: "#652D90",
                      }}
                    />
                  )}
                </button>
              </span>
            </div>
          </div>
          {/* Recommended
           */}
          <>
            <h2
              className="productsHeading"
              style={{ "font-weight": "bold", color: "#333;" }}
            >
              Recommended Products
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
          </>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
