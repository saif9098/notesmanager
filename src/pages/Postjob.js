import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-kit';
import "../styles/InnerPage.css";

const Postjob = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [description, setDesc] = useState('')
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

 
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setDesc(result)
    }
  })
  const micOn = () => {
    listen();
    setIsListening(true);
  }
  const micOff = () => {
    stop();
    setIsListening(false);
  }
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Assuming you have stored the authentication token in local storage
  const authToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId')
  // Call the setAuthToken function with the authentication token
  setAuthToken(authToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/job/create-job", {
        title,
        description,
        tag
      })
      if (data) {
        navigate("/dashboard");
        toast.success("Job Posted Successfully");
      } else {
        navigate("/dashboard");
        toast.error("Job not Posted")
      }
    } catch (error) {

      toast.error("Invalid Job Details Please Try Agian!");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container col-md-8 p-5">
        <div className='container col-md-12'>
         
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input value={title} type="text" className="form-control border border-top-0 border-start-0 border-end-0 border-2 border-dark rounded-0  bg-transparent" id="title" name="title" aria-describedby="emailHelp" onChange={(event) => setTitle(event.target.value)} minLength={4} placeholder='Title' />
          </div>
          <div className="mb-3">
            <input value={tag} type="text" className="form-control border border-top-0 border-start-0 border-end-0 border-2 border-dark rounded-0 bg-transparent" id="tag" name="tag" onChange={(event) => setTag(event.target.value)} minLength={4} placeholder='Tag' />
          </div>
          <div className="mb-3" id='descMice'>
            <textarea value={description} type="text" className="form-control border border-bottom-3 border-dark bg-transparent p" id="description" name="description" minLength={4} rows={6} placeholder='Writes notes here' onChange={(event) => setDesc(event.target.value)} ></textarea>
            <div id='mice'> {isListening ? <i class="fa-solid fa-microphone " onClick={micOff}></i> : <i class="fa-solid fa-microphone-slash" onClick={micOn}></i>}
            </div>
          </div>
          <button disabled={title.length < 3 || description.length < 8} type="submit" className="btn btn-primary" >Add note</button>
        </form>
      </div>
    </Layout>
  )
}

export default Postjob
