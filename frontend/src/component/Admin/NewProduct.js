import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [category, setCategory] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [archive, setArchive] = useState("Not Archived");
  // const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Beauty and Personal Care",
    "Electronics",
    "Home and Kitchen",
    "Men Clothing",
    "Tools and Improvements",
    "Toys",
    "Women Clothing",
  ];

  const dateDict = {};
  // Get current date
  const currentDate = new Date();
  // Loop through next 30 days and add to dictionary
  for (let i = 1; i < 31; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i
    );
    // console.log("added");
    dateDict[date.toISOString().slice(0, 10)] = { date, available: false };
  }

  // console.log(dateDict);

  const available = ["Not Archived", "Archived"];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);

    myForm.set("category", category);
    myForm.set("archive", archive);
    // myForm.set("Stock", Stock);
    myForm.set("userId", user._id);
    // myForm.set("availableDates", availableDates);
    myForm.append("availableDates", JSON.stringify(availableDates));
    // pres.forEach((date) => {
    //   myForm.append("dates", date);
    // });

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard row ">
        <SideBar />

        <div
          className="col-md-9 newProductContainer bg-transparent"
          style={{ height: "0%", width: "70%" }}
        >
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <textarea
                placeholder="Product Name and Details"
                value={name}
                onChange={(e) => setName(e.target.value)}
                cols="30"
                rows="1"
                required
              ></textarea>
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AccountTreeIcon />

              <select
                value={availableDates}
                onChange={(e) =>
                  setAvailableDates(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
              >
                {Object.entries(dateDict).map(([key, value]) => (
                  <option key={key} value={value.date.toDateString()}>
                    {value.date.toDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <select onChange={(e) => setArchive(e.target.value)}>
                {/* <option value="">Mark it as archived or not archived</option> */}
                {available.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div> */}

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
