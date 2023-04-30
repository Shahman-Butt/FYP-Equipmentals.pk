import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
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
// import { Calendar } from "./ProductCalendar.js";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const productId = match.params.id;
  console.log("productId", productId);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // const { succes, error: notificationError } = useSelector(
  //   (state) => state.newNotification
  // );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [buttonText, setButtonText] = useState("Notify Me When Available");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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
    console.log(myForm);
  };

  const notificationSubmitHandler = () => {
    const myForm2 = new FormData();

    myForm2.set("productId", match.params.id);

    dispatch(newNotification(myForm2));

    console.log(myForm2);
  };
  useEffect(() => {
    if (user && user.favorites) {
      console.log(user.favorites);
      const isFav = user.favorites.some((favorite) => favorite === product._id);
      setIsFavorite(isFav ? true : false);
    }
  }, [user, product]);

  useEffect(() => {
    console.log(
      "######################################### IMP ######################"
    );
    if (product && product.notifyMe) {
      console.log(product.notifyMe, "product.notifyMe");
      console.log("user ID ########", user._id);

      const isNoti = product.notifyMe.some((noti) => noti.user === user._id);
      console.log("user noti ########", isNoti);
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails bg-transparent">
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

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs. ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="">
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
                        <Favorite
                          fontSize="large"
                          style={{ color: "#652D90" }}
                        />
                      ) : (
                        <FavoriteBorder
                          fontSize="large"
                          style={{
                            color: "#652D90",
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <div>
                <div>
                  {product.availableDates && product.availableDates[0] ? (
                    <div className="calendar">
                      {product.availableDates &&
                        product.availableDates.map((cal) => (
                          <CalendarCard key={cal.date} cal={cal} />
                        ))}
                    </div>
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
                </div>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

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
