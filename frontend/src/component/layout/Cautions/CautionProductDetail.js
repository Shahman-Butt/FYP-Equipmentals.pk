import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ProductCautions = () => {
    return (
        <div className="product-cautions" style={{"margin-top": "20%", "margin-right": "2%"}}>

            <ul>
                <div className="d-flex flex-row" >
                    <div>
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <p style={{ marginLeft: "10px" }}>Read the product reviews and ratings before making a purchase to ensure the product meets your expectations.</p>
                    </div>
                </div>
                <div className="d-flex flex-row" >
                    <div>
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <p style={{ marginLeft: "10px" }}>Be wary of deals that seem too good to be true and always verify the legitimacy of the website and seller.</p>
                    </div>
                </div>
                <div className="d-flex flex-row" >
                    <div>
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <p style={{ marginLeft: "10px" }}> Beware of suspiciously low prices or too-good-to-be-true deals.</p>
                    </div>
                </div>




            </ul>
        </div>
    );
};

export default ProductCautions;
