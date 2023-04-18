import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
// import Calendar from "./ProductCalendar";
// import ProductCalendar from "./ProductCalendar";
// import MyCalendar from "./CalendarDates";
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
import CalendarCard from "./CalendarCard";
// import { Calendar } from "./ProductCalendar.js";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const productId = match.params.id;
  // const userId =
  console.log("productId", productId);

  // const { product, loading, error, isAuthenticated } = useSelector(
  //   (state) => state.productDetails
  // );
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // const [quantity, setQuantity] = useState(1);
  // const quantity = 1;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const addToFavoritesHandler = (history) => {
    const myForm1 = new FormData();

    const userId = user._id;
    myForm1.set("productId", match.params.id);
    myForm1.set("userId", userId);

    dispatch(addItemsToFavorites(myForm1));

    alert.success("Item Added To Favorites");
    // alert.success(`Item ${match.params.id} Added To Favorites`);

    setTimeout(() => {
      window.location.href = "/favorites";
    }, 1000);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    // if (isAuthenticated === false) {
    //   alert.error("Login to View Product Details");
    //   // history.push("/login");
    // }
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
  }, [
    dispatch,
    match.params.id,
    error,
    alert,
    reviewError,
    success,
    // isAuthenticated,
  ]);

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
                  <div className="detailsBlock-3-1-1">
                    {/* <button onClick={decreaseQuantity}>-</button> */}
                    {/* <input readOnly type="number" value={quantity} /> */}
                    {/* <button onClick={increaseQuantity}>+</button> */}
                  </div>

                  <button
                    // disabled={product.Stock < 1 ? true : false}
                    onClick={addToFavoritesHandler}
                  >
                    {/* <script>console.log/("addto fav handler");</script> */}
                    Add to Favorites
                    {/* {match.params.id} */}
                  </button>
                </div>

                {/* <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p> */}
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <div>
                {/* <MyCalendar markedDates={product.availableDates} /> */}
                {/* <ProductCalendar productId={productId} /> */}

                {/* <Calendar key={product._id} /> */}
                {/* <Calendar></Calendar>{" "} */}

                <div>
                  {product.availableDates && product.availableDates[0] ? (
                    <div className="calendar">
                      {product.availableDates &&
                        product.availableDates.map(
                          (cal) => (
                            // {
                            <CalendarCard key={cal.date} cal={cal} />
                            // {d.date}
                            // <p> d.isBooked</p>}
                          ) // <p>"isBooked"</p>}
                          // <ReviewCard key={review._id} review={review} />
                        )}
                    </div>
                  ) : (
                    <p className="noCalendar">No Available Date</p>
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
