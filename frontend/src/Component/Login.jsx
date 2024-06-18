import React, { useState } from 'react'
import "../Css/Login.css"
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import BackButton from './BackButton';


const Login = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e)
  }

  const [lcreds, setlCreds] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setlCreds({ ...lcreds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Fetching our API
    const response = await fetch("http://localhost:3000/api/auth/logincustomer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: lcreds.email, password: lcreds.password }),
    })

    const data = await response.json();
    setlCreds({ email: "", password: "" });

    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate('/landing')
      console.log("You are successfully logged in to your account", "success");
    }

    else {
      alert("Please enter correct details to login")
      console.log("Please enter the correct details")
    }
  }

  return (
    <>
      <PageTransition>
        <div id='signup-container' style={{position : 'relative'}}>
          <BackButton />
          <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <input type="email" name="email" id="" placeholder='Enter your Email-id' value={lcreds.email} onChange={handleChange} />
            <input type="password" name="password" id="" placeholder='Enter your password' value={lcreds.password} onChange={handleChange} />
            <input type="submit" value="Submit" id='btn' />
            <p id='signup-link' onClick={() => { handleClick('/signup') }}>! Not Signed Up Yet !</p>
          </form>
          <div id="back-shape1"></div>
          <div id="back-shape2"></div>
        </div>
      </PageTransition>
    </>
  )
}

export default Login
