import { Button, Avatar } from "@primer/react";
import { ButtonDanger } from "@primer/react/deprecated";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../envConstants";
import toast from "react-hot-toast";

interface UserProfile {
  username: string;
  email: string;
}

const NavBar = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get(`${url}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log("response data:", response)
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token');
      setProfile(null);
      toast.success("User Logged In!")
      navigate('/signin');
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <div className="flex justify-around items-center bg-slate-300 border-b border-slate-400 shadow-md p-4 mb-6">
      <div className="flex items-center">
        <span className="text-xl font-bold">My Todo App</span>
      </div>
      <div className="flex items-center">
        {profile ? (
          <>

            <span className="mr-4">
              <Link to='/profile' >
                <Avatar src="https://avatars.githubusercontent.com/u/92997159?v=4"
                size={30} className=" m-2"/>
                Welcome, {profile.email}
              </Link>
            </span>
            <ButtonDanger onClick={handleSignOut}>Logout</ButtonDanger>
          </>
        ) : (
          <>
            <Link to='/signin' className="mr-4">
              <Button>Sign In</Button>
            </Link>
            <Link to='/signup'>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
