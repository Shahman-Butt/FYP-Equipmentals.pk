import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ProductCautions = () => {
  return (
    <div
      className="product-cautions"
      style={{ "margin-top": "20%", "margin-right": "2%" }}
    >
      <ul>
        <div className="d-flex flex-row">
          <div>
            <FaExclamationTriangle size={20} />
          </div>
          <div>
            <p style={{ marginLeft: "10px" }}>
              Use strong and unique passwords for each account.
            </p>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div>
            <FaExclamationTriangle size={20} />
          </div>
          <div>
            <p style={{ marginLeft: "10px" }}>
              If you have any doubts or questions about the product, it is
              always a good idea to contact the seller or the customer support
              team before making a purchase
            </p>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div>
            <FaExclamationTriangle size={20} />
          </div>
          <div>
            <p style={{ marginLeft: "10px" }}>
              {" "}
              Always check the condition of the product on getting it.
            </p>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ProductCautions;
