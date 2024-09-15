import React, { useState } from 'react'
import axios from 'axios';
import { useAuth} from '../Context';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const {currentUser, setCurrentUser} = useAuth();

    const navigate = useNavigate()
    

    // form-ka waaye
    const HandleSubmit = async (event) => {
        event.preventDefault();
        try{
          // {data}: distructure ku samee meshi ahayd data.data saaan le dheh {data}
            const {data} = await axios.post("http://localhost:5000/api/v1/users/login_user", {
                username, password
            });

            setCurrentUser(data)
            navigate("/create-post")
            console.log("Login Successful.")
            // toast.success(data)

        }catch(e){
            console.log("ERROR AT login", e)
        }

    }

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <h1>Login Form</h1>
        <input
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        type="text" placeholder='Enter your username' />
        <br />
        <input 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}

        type="password" placeholder='Enter Password'/>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
