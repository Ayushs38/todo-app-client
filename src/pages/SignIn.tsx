import { Box, Button, FormControl } from '@primer/react'
import { TextInput } from '@primer/react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { url } from '../envConstants';
const SignIn = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/signin`, data);
            const token = response.data.accessToken;
            localStorage.setItem('token', token); // Store the JWT in localStorage
            console.log('Sign In Successful:', token);
            navigate('/todo'); // Redirect to a protected route after successful sign-in
        } catch (error) {
            console.error('Sign In Error:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box as="form" onSubmit={handleSignIn} className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className=' mb-4 text-2xl font-bold'>Sign in Here</h2>
        <FormControl >
          <div className="mb-4">
            <FormControl.Label>Email:</FormControl.Label>
            <TextInput
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <FormControl.Label>Password:</FormControl.Label>
            <TextInput
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <span className="block mb-4 text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </span>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:shadow-outline">
            Sign In
          </Button>
        </FormControl>
      </Box>
    </div>
    )
}

export default SignIn