import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const PremiumProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {product.premium !== "Not Premium" && product.premium !== null && (
        <Link className="productCard" to={`/product/${product._id}`}>
          <img src={product.images[0].url} alt={product.name} />
          <p style={{ "font-weight": "bold", color: "#333;" }}>
            {product.name}
          </p>
          <div>
            <Rating {...options} />{" "}
            <span className="productCardSpan">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <span>{`Rs. ${product.price}`}</span>
        </Link>
      )}
    </>
  );
};

export default PremiumProductCard;