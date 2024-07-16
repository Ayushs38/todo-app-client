import { Box, Button, FormControl } from '@primer/react'
import { TextInput } from '@primer/react'
import axios from 'axios'
import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { url } from '../envConstants'
const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const  navigate = useNavigate();

  const handleChange = (e:any) =>{
    const { name, value} = e.target;
    setData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }
  const handleSignUp = async (e: any) =>{
    e.preventDefault();
    try {
      await axios.post(`${url}/auth/signup`, data);
      console.log('Sign Up succesfull');
      navigate('/signin')
      
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <Box as="form" onSubmit={handleSignUp} className="p-6 bg-white shadow-lg rounded-lg">
    <h2 className=' mb-4 text-2xl font-bold'>Sign Up Here</h2>
      
      <FormControl >
        <div className="mb-4">
          <FormControl.Label>Username:</FormControl.Label>
          <TextInput
            name="username"
            value={data.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
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
          Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link>
        </span>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:shadow-outline">
          Sign Up
        </Button>
      </FormControl>
    </Box>
  </div>
  )
}

export default SignUp