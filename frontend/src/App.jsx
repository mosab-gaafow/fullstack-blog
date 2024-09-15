import { Outlet, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import { useAuth } from "./Context"
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";



function App() {  
  axios.defaults.withCredentials = true;
  
  // check garee inuu user-ku information heesto iyo in kale
//  muhiimadu waa inaa mar walba check gareeno user-ka haddi uu route is bedelo
const { setCurrentUser } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/get-user-profile");
      setCurrentUser(data);
    } catch (e) {
      if(e.response.status == 403){
        toast.error("Please make login first");
        navigate('/login');
      }
      console.log("error at fetching user profile", e.response.status);
      // toast.error(e.response?.data?.message || "Error fetching user profile");
    }
  };
  fetchUserProfile();
}, [setCurrentUser]);



  return (
    <div style={{maxWidth: "1120px", marginInline: "auto"}}>
      <Toaster/>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
