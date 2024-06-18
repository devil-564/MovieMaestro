import React, { useState } from 'react'
import '../Css/Signup.css'
import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition'
import BackButton from './BackButton'

const Signup = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ name: "", email: "", password: "" })

  const handleClick = (e) => {
    navigate(e)
  }


  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetching our API
    const response = await fetch("http://localhost:3000/api/auth/createcustomer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }),
    })

    const data = await response.json();
    setCreds({ name: "", email: "", password: "" });

    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate('/landing')
      console.log("You are successfully created your account", "success");
    }

    else {
      alert("Please enter correct details to signUp")
      console.log("Please enter the correct details")
    }
  }
  return (
    <>
      <PageTransition>
        <div id='signup-container' style={{position : "relative"}}>
          <BackButton />
          <form onSubmit={handleSubmit}>
            <h1>Signup Form</h1>
            <input type="text" placeholder='Enter your name' name='name' onChange={handleChange} value={creds.name} />
            <input type="email" name="email" id="" placeholder='Enter your Email-id' onChange={handleChange} value={creds.email} />
            <input type="password" name="password" id="" placeholder='Enter your password' onChange={handleChange} value={creds.password} />
            {/* <p onSubmit={handleSubmit}>Submit</p> */}


            <input type="submit" value="Submit" id='btn' />
            <p id='signup-link' onClick={() => { handleClick('/login') }}>! Already Signed Up Want To Sign-In !</p>
          </form>

          <div id="back-shape1"></div>
          <div id="back-shape2"></div>
        </div>
      </PageTransition>
    </>
  )
}

export default Signup
