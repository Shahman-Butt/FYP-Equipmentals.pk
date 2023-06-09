import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import "../Product/ProductDetails.css";
import header from "../layout/Header/Header";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const handleClick = () => {
    history.push("/password/update");
  };
  const handleClick2 = () => {
    history.push("/me/update");
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      <header />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              {/* <h1>My Profile</h1> */}
              <img src={user.avatar.url} alt={user.name} />

              <button
                onClick={handleClick2}
                className="btn submitReview"
                style={{
                  backgroundColor: "#652D90",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>
            </div>
            <div>
              {/* <div>
                {" "}
                <h4  style={{"font-weight": "bolder"}}>User Id</h4>
                <p style={{"font-weight": "bolder"}}>{String(user._id)}</p>
              </div> */}
              <div>
                <h4 style={{ "font-weight": "bolder" }}>Full Name</h4>
                <p style={{ "font-weight": "bolder" }}>{user.name}</p>
              </div>
              <div>
                <h4 style={{ "font-weight": "bolder" }}>Email</h4>
                <p style={{ "font-weight": "bolder" }}>{user.email}</p>
              </div>
              <div>
                <h4 style={{ "font-weight": "bolder" }}>Location</h4>
                <p style={{ "font-weight": "bolder" }}>{user.addr}</p>
              </div>
              <div>
                <h4 style={{ "font-weight": "bolder" }}>Contact Number</h4>
                <p style={{ "font-weight": "bolder" }}>{user.numb}</p>
              </div>
              {/* <div>
                <h4 style={{"font-weight": "bolder"}}>Loaction</h4>
                <p style={{"font-weight": "bolder"}}>{user.loc}</p>
              </div> */}
              <div>
                <h4 style={{ "font-weight": "bolder" }}>Joined On</h4>
                <p style={{ "font-weight": "bolder" }}>
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="btn submitReview"
                  style={{
                    backgroundColor: "#652D90",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
