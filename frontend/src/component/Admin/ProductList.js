import React, { Fragment, useEffect } from "react";
// import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import SideBar from "./Sidebar";
// import { useSelector, useDispatch } from "react-redux";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "archive",
      headerName: "Archive status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "premium",
      headerName: "Premium",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
            {user.role === "admin" && (
              <>
                <Link
                  to={`/admin/premiumproduct/${params.getValue(
                    params.id,
                    "id"
                  )}`}
                >
                  <AttachMoneyIcon />
                </Link>
              </>
            )}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,

        price: item.price,
        premium: item.premium,
        name: item.name,
        archive: item.archive,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard row" style={{ height: "1%", }}>
        <SideBar />
        <div
          className="productListContainer col-md-9"
          style={{ height: "0%"}}
        >
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          {/* <p> User Id: {String(user._id)}</p> */}
          <p style={{ margin: "10px 0 5px 0", fontWeight: "bold" }}>
            User Name: &nbsp;
            {String(user.name)}
          </p>

          {/* <div className="user-id-container">
          <label className="user-id-label">User ID:</label>
          <input type="text" value={user._id} className="user-id-field" />
        </div> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
