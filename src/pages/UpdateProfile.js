import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFrom from "../components/shared/InputFrom";
import Layout from '../components/Layout/Layout'
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = () => {

let userData = localStorage.getItem("Auth");
const user = JSON.parse(userData);

// Access name, email, and id properties
const { _id,name, email, lastName,location } = user;
  const [nName, setName] = useState(name);
  const [nLastName, setLastName] = useState(lastName);
  const [nEmail, setEmail] = useState(email);
  const [nLocation, setLocation] = useState(location);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // Assuming you have stored the authentication token in local storage
  const authToken = localStorage.getItem('token');
  
  // Call the setAuthToken function with the authentication token
  setAuthToken(authToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await axios.put("/api/v1/user/update-user", {
        _id,
        nName,
        nLastName,
        nEmail,
        nLocation,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
   console.log(data?.updatedUser)
       let ls = localStorage.getItem("Auth");
       ls = JSON.parse(ls);
        ls = data.updatedUser;
        localStorage.setItem("Auth", JSON.stringify(ls));
        let ls_Token =localStorage.getItem("token")
       // ls_Token = JSON.parse(ls_Token);
       console.log(data.token)
        ls_Token = data.token;
         localStorage.setItem("token", JSON.stringify(ls_Token));
       
        toast.success("Profile Updated Successfully");
     }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
    <Layout >
    <div className="form-container">
    <form className="card p-2" onSubmit={handleSubmit}>
     
      <InputFrom
        htmlFor="name"
        labelText={"Name"}
        type={"text"}
        value={nName}
        handleChange={(e) => setName(e.target.value)}
        name="name"
      />
      <InputFrom
        htmlFor="lastName"
        labelText={"Last Name"}
        type={"text"}
        value={nLastName}
        handleChange={(e) => setLastName(e.target.value)}
        name="lastName"
      />
      <InputFrom
        htmlFor="email"
        labelText={"Email"}
        type={"email"}
        value={nEmail}
        handleChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <InputFrom
        htmlFor="password"
        labelText={"Location"}
        type={"text"}
        value={nLocation}
        handleChange={(e) => setLocation(e.target.value)}
        name="password"
      />

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  </div>
  </Layout>
    </div>
  )
}

export default UpdateProfile
