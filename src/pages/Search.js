import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/InnerPage.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSpeechSynthesis } from "react-speech-kit";
import SearchInput from "../components/Layout/SearchInput";
import { useSearch } from "../context/search";


const descriptionStyle ={
  WebkitLineClamp:5,
  webkitBoxOrient:'vertical',
  overflow:'hidden',
  display:'-webkit-box'

}

const Search = () => {
  const initialjobs = []
  const [jobs, setjobs] = useState(initialjobs);
  const [isopen, setIsopen] = useState(false);
  const [speakStates, setSpeakStates] = useState({});
  const [showLessMoreIcon,setIcon]=useState(false);
  const { speak,cancel } = useSpeechSynthesis();
  const [isSpeak ,setSpeak] = useState(false);
  const ref = useRef(null);
  const [values, setValues] = useSearch();
  const navigate = useNavigate()

const playtext =(d)=>{
  // setSpeak(!isSpeak)
  speak({Text:d})
  // if(isSpeak==true){
  // }
}

const search=()=>{
setjobs(values?.results)
};
  const deleteJob =async (id)=>{
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
  let resp = await axios.delete(`/api/v1/job/delete-job/${id}`);
  navigate("/dashboard")
  }

  useEffect(() => {
      search()
    
   
  }, [])

  const handleEdit = (job)=>{
    localStorage.setItem("job" , JSON.stringify(job))
  }
  useEffect(() => {
    if(ref.current){
     setIcon( ref.current.scrollHeight!== ref.current.clientHeight )
     console.log(ref.current.clientHeight)
    
    }
    }, [])
    const toggleSpeak = (jobId) => {
      setSpeakStates(prevState => ({
        ...prevState,
        [jobId]: !prevState[jobId] // Toggle speak state for the clicked job
      }));
    };
  return (
  
    <Layout >
    <div className="">
   
    <h5 className="p-3 text-center">
    {jobs.length < 1
      ? "No Notes Found"
      : `Found ${jobs?.length}`}
  </h5>
      {jobs?.map((p) => (
        
        <div className="border border-2 rounded-2 border-dark my-1"  id="box" >
        <table className="table">
   
    <tbody>
      <tr>
        <td>
        <div className="d-flex justify-content-between flex-wrap">
          <h3 className=" text-dark">{p.title }</h3>
          <h5>Tag : <span className="text-success">{p.tag? p.tag :"****"}</span></h5>
          </div>  
        </td>
        </tr>
        <tr>
        <td>
        <div className="m-2">
               
                 <h5 style={isopen? null :descriptionStyle} ref={ref} className="text-dark">{p.description}</h5>
                 <div>
                 { showLessMoreIcon&&(<span>...
                   {isopen?   <i class="fa-solid fa-caret-down mx-2" onClick={()=>setIsopen(!isopen)}></i>
                    :<i class="fa-solid fa-caret-right mx-2" onClick={()=>setIsopen(!isopen)}></i>}</span>)
                 }
                 </div>
                 <div>
                 {speakStates[p._id] ? (
                   <i className="fa-solid fa-volume-high" onClick={() => {
                     toggleSpeak(p._id);
                     cancel(); // Stop speech synthesis for this job
                   }}></i>
                 ) : (
                   <i className="fa-solid fa-volume-xmark" onClick={() => {
                     toggleSpeak(p._id);
                     speak({ text: p.description });
                   }}></i>
                 )}
               </div>
                </div>
        </td>
        </tr>
        <tr>
        <td>
        <div className="d-flex flex-wrap justify-content-between">
        <div>
        <NavLink
        to="/dashboard/update-jobs"
        >
        <button type="button" className="btn btn-primary me-2" onClick={()=>{handleEdit(p)}}>
        Edit
        </button>
        </NavLink>
        
        <button type="button" className="btn btn-danger" onClick={()=>{deleteJob(p._id)}}>
        Delete
        </button>
        
        </div>
        <div>
        <h5>Posted : <span className="text-primary">{moment(p.updatedAt).fromNow()}</span></h5>
        </div>
  
      </div>
        </td>
      </tr>
     
    </tbody>
  </table>
       
               
              
            
        </div>
      


         ))}
 </div>
        
  </Layout>
  );
};

export default Search;
