import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context'
import {toast} from 'react-hot-toast';
import axios from 'axios';
const Header = () => {
  const {currentUser, setCurrentUser} = useAuth();


  const HandleLogout = async() => {
    try{

      const {data} = await axios.post ("/api/v1/users/logout");
      toast.success(data);

      setCurrentUser(null);
      
    }catch(e){
      console.log(e.response.data)
      toast.error(e.response.data);

    }
  }


  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Logo</h1>
        {/* Login iyo signUp waa inay qarsanaadaan marka uu user-ku login yahay. */}
            {/* login iyo signup wa inay so baxaan marka uu user-ku login uusan ahayn, create post-na marka uu user-ka login yahay */}
        <ul>
          {currentUser ? (
            <Link to='/create-post'>Create Post</Link>
          ) : (
          
          <>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>SignUp</Link>
          </>
          )}
        </ul>
        {currentUser &&
        <>
        <button onClick={HandleLogout}>Logout</button>
        <span>Welcome {currentUser?.username}</span>
        </>
}
      </header>
    </div>
  )
}

export default Header
