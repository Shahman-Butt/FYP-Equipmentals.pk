import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  premiumProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";

import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const PremiumProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const [name, setName] = useState("");
  const [payment, setPayment] = useState(0);
  const [premium, setPremium] = useState("");

  const premiumStatus = ["Premium", "Not Premium"];
  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPayment(product.payment);
      setPremium(product.premium);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const premiumProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("payment", payment);
    myForm.set("premium", premium);
    dispatch(premiumProduct(productId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Premium Product" />
      <div className="dashboard row" style={{ height: "1%" }}>
        <SideBar />
        <div className="newProductContainer  col-md-9  bg-transparent">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={premiumProductSubmitHandler}
          >
            <h1>Premium Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                disabled
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Premium Ad Payment"
                required
                onChange={(e) => setPayment(e.target.value)}
                value={payment}
              />
            </div>

            <div>
              <StorageIcon />
              <select
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
              >
                <option value="">Mark it as premium</option>
                {premiumStatus.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail}
                  </option>
                ))}
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Make Premium
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PremiumProduct;
