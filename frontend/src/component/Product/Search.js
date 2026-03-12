import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- EquipmentalsPk" />
      <div className="search-container">
        
        <button 
          className="search-back-btn" 
          onClick={() => history.goBack()}
          aria-label="Go Back"
        >
          <ArrowBackIcon />
        </button>

        <div className="search-content">
          <h2 className="search-heading">What are you looking for?</h2>
          <form className="modern-search-box" onSubmit={searchSubmitHandler}>
            <div className="search-input-wrapper">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search premium equipment, tools, tech..."
                onChange={(e) => setKeyword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>
          
          <div className="search-suggestions">
            <p>Popular searches:</p>
            <div className="suggestion-tags">
               <span onClick={() => history.push("/products/camera")}>Camera</span>
               <span onClick={() => history.push("/products/laptop")}>Laptop</span>
               <span onClick={() => history.push("/products/drill")}>Power Drill</span>
               <span onClick={() => history.push("/products/projector")}>Projector</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
