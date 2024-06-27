import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Layout.css";
import { userMenu } from "./Menus/UserMenu";
import {  useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarMenu = userMenu;
  
  
  // Retrieve authentication token from local storage
  let userData = localStorage.getItem("Auth");
  const user = JSON.parse(userData);
  
  // Access name, email, and id properties
  const { name, email} = user;
  const [username, setname] = useState(name)
  const [usermail, setmail] = useState(email)
    

useEffect(() => {
  // let userData = localStorage.getItem("Auth");
  // const user = JSON.parse(userData);
  // const { name, email} = user;
  setname(name)
  setmail(email)
}, [])

  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfuly");
    navigate("/login");
  };
  return (
    <>
      <div className="row dash-container">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>NOTES MANAGEMENT SYSTEM</h6>
          </div>
          <hr />
          <p className="text-center text-info">Welcome {username} ({usermail})</p>
          <hr />
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;
