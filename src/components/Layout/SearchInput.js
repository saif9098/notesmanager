import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
const SearchInput = () => {
  const [values, setValues] = useSearch({
    keyword: "",
    results: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.get(
        `/api/v1/job/search/${values.keyword}`
        );
        dispatch(hideLoading());
        setValues({ ...values, results: data });
        navigate("/dashboard/search")
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="m-3">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-sm me-2 pt-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-sm btn-outline-success pt-2 me-3" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;