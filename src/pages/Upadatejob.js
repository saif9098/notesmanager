import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Upadatejob = () => {
  const jobdata = localStorage.getItem("job")
  const job = JSON.parse(jobdata)
  const {title,description,tag,_id}=job
  const [ncompany, setCompany] = useState(title);
  const [njobType, setJobType] = useState(description);
  const [nsalary, setSalary] = useState(tag);
 
  const navigate = useNavigate();
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

    const handleSubmit =async (e) => {
      e.preventDefault();
      try{
      const {data} = await axios.patch(`/api/v1/job/update-job/${_id}`,{
        ncompany,
        njobType,
        nsalary,
       
      })
      if (data) {
          navigate("/dashboard");
          localStorage.removeItem("job")
          toast.success("Job Updated Successfully");
      }
    } catch (error) {
      
      toast.error("Invalid Job Details Please Try Agian!");
      console.log(error);
    }
    };
  
    return (
        <Layout>
        <div className="container col-md-8 p-5">
        <h2>Update Your Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company</label>
            <input type="text" className="form-control" id="company" value={ncompany} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="text" className="form-control" id="salary" value={nsalary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="jobType" className="form-label">Job Type</label>
            <textarea type="text" className="form-control" id="jobType" value={njobType} onChange={(e) => setJobType(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">Post Job</button>
        </form>
      </div>
    </Layout>
  )
}

export default Upadatejob
