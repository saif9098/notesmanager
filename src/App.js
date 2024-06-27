import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Postjob from "./pages/Postjob";
import Upadatejob from "./pages/Upadatejob";
import Search from "./pages/Search";

function App() {
  
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard/post-jobs" element ={<PrivateRoute><Postjob/></PrivateRoute>}/>
        <Route path="/dashboard/update-jobs" element ={<PrivateRoute><Upadatejob/></PrivateRoute>}/>
        <Route path="/dashboard/search" element ={<PrivateRoute><Search/></PrivateRoute>}/>
    
       
      <Route
      path="/user/profile"
      element={
        <PrivateRoute>
          <UpdateProfile />
        </PrivateRoute>
      }
    />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
