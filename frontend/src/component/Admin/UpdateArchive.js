import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateArchiveStatus,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";

import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";

import SideBar from "./Sidebar";
import { UPDATE_ARCHIVE_RESET } from "../../constants/productConstants";

const UpdateArchive = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const [name, setName] = useState("");
  // const [payment, setPayment] = useState(0);
  const [archive, setArchive] = useState("");

  const archiveStatus = ["Not Archived", "Archived"];
  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      // setPayment(product.payment);
      setArchive(product.archive);
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
      dispatch({ type: UPDATE_ARCHIVE_RESET });
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

  const archiveProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("archive", archive);
    dispatch(updateArchiveStatus(productId, myForm));

    setTimeout(() => {
      window.location.href = "/archives";
    }, 1000);
    alert.success("Item Archive Status Updated");
  };

  return (
    <Fragment>
      <MetaData title="Archive Status Update" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={archiveProductSubmitHandler}
          >
            <h1>Archive Status Update</h1>

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
              <StorageIcon />
              <select
                value={archive}
                onChange={(e) => setArchive(e.target.value)}
              >
                <option value="">Mark it as archived or not archived</option>
                {archiveStatus.map((avail) => (
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
              Update Archive Status
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateArchive;
