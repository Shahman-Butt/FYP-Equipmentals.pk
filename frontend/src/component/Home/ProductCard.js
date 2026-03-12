import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

import banner2 from "../../images/banner2.jpg";
const ProductCard = ({ product }) => {
  // const imgURL = "../../images/banner2.jpg";
  let pim = "";
  let imgURL = "";
  // let imgURL = require("../../images/banner2.jpg").default;
  if (product.images.length <= 0 && product.im) {
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
  }
  // console.log("imgURL   ", imgURL);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="modern-product-card" to={`/product/${product._id}`}>
      <div className="product-image-container">
        {product.images.length ? (
          <img src={product.images[0].url} alt={product.name} />
        ) : (
          <img src={imgURL} alt={product.name} />
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <Rating {...options} />
          <span className="reviews-count">({product.numOfReviews} Reviews)</span>
        </div>
        <span className="product-price">{`Rs. ${product.price} / day`}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
