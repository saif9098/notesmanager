import React from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
const HomePage = () => {
  return (
    <>
    <img src="/assets/images/home.png" alt="logo" id="myVideo" />
      <div className="my-container">
        <div className="card">
          <img src="/assets/images/logo/logo.png" alt="logo" />
          <hr />
          <div className="card-body" style={{ marginTop: "-60px" }}>
            <h5 className="card-title">Best Notes Management System </h5>
            <p className="card-text">
            Search and manage your notes with ease. free and open source Inotebook application by saif raza
            </p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a user Register <Link to="/register">Here !</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;


