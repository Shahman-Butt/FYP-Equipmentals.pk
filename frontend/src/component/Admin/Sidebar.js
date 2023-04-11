import React from "react";
import "./sidebar.css";
import Typography from "@material-ui/core/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import logo from "../../images/logo.PNG";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Sidebar = () => {
  return (
    <div class="col-md-3" >
      <div class="list-group" style={{ margin: "0% 10% 0% 10%", padding: "136px 0 0 0" }}>
        <a
          href="/admin/products"
          style={{ "font-weight": "bold", background: "#652D90" }}
          class="list-group-item list-group-item-action active"
        >
          All Products
        </a>
        <Link to={"/admin/dashboard"}
          class="list-group-item list-group-item-action"
        // onClick={userProduct}
        >
          Statistics
        </Link>
        <Link to={"/favorites"}
          class="list-group-item list-group-item-action"
        // onClick={product}
        >
          Favourites{" "}
        </Link>
        <Link to={"/admin/users"}

          class="list-group-item list-group-item-action"
        >
          Users
        </Link>

        <Link to={"/admin/reviews"}
          class="list-group-item list-group-item-action"
        // onClick={logoutUser}
        >
          Reviews
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;
