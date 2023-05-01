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
    console.log("product.im", product.im);
    pim = product.im;
    try {
      imgURL = require(`../../images/${pim}`).default;
      console.log(pim, "pim");
      console.log("pim imgurl", imgURL);
    } catch (error) {
      console.log(`Failed to load image: ${pim}`, error);
    }
    // //  imgURL = require(pim).default;
    // const i = require(`../../${pim}`).default;
    // console.log(pim, "pim");
    // console.log("pim imgurl", i);
  }
  console.log("imgURL   ", imgURL);
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {/* <img src={product.images[0].url} alt={product.name} /> */}
      {product.images.length ? (
        <img src={product.images[0].url} alt={product.name} />
      ) : (
        <img src={imgURL} alt={product.name} />
      )}

      <p style={{ "font-weight": "bold", color: "#333;",height: "50px", overflow: "hidden" }}>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`Rs. ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
