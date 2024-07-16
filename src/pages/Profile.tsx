import { Button } from "@primer/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { url } from "../envConstants";
interface UserProfile {
  username: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  

  useEffect(()=>{
    const fetchProfile = async()=>{
      try {
        const token = localStorage.getItem('token');
       
        const response = await axios.get(`${url}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response:", response)
        setProfile(response.data)
        
      } catch (error) {
        console.error('Error fetching profile:',error)
        navigate('/signin')
      }
    };
    fetchProfile();
  }, [])

  const handleSignOut = async () => {
    try {
      // await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signout`);
      localStorage.removeItem('token'); // Remove token from localStorage
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };


  if(!profile){
    return <div>Loading...</div>
  }
  return (
    <div>
      Hiiiiiii
      <p>Welcome, {(profile.username)}</p>


      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  )
}

export default Profile