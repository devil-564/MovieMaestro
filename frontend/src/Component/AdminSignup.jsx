import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Css/AdminSignup.css"
import PageTransition from './PageTransition'
import BackButton from './BackButton'

const AdminSignup = () => {
    const [creds, setcreds] = useState({ name: "", email: "", password: "", registration_no: "" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        navigate("/adminlogin")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetching our API
        const response = await fetch("http://localhost:3000/api/admin/createadmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password, registration_no: creds.registration_no }),
        })

        const data = await response.json();
        setcreds({ name: "", email: "", password: "", registration_no: "" });

        if (data.success) {
            localStorage.setItem('token', data.authtoken);
            navigate('/adminhome')
            console.log("You are successfully created your account", "success");
        }

        else {
            alert("Please enter correct details to signUp")
            console.log("Please enter the correct details")
        }
    }

    return (
        <PageTransition>
            <div class="login-container">
                <BackButton />
                <h1 id='login_container_head_name'>MOVIE MAESTRO</h1>
                <img src="https://images.unsplash.com/photo-1612934622902-d3ad43c407b9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" id='login-container-image' />

                <form id="loginForm" onSubmit={handleSubmit}>
                    <h2> Admin Signup</h2>

                    <input type="text" id="adminName" name="name" value={creds.name} onChange={handleChange} required placeholder='Enter Admin Name' />

                    <input type="email" id="adminEmail" name="email" value={creds.email} onChange={handleChange} required placeholder='Enter Admin Email Id' />

                    <input type="password" id="adminPassword" name="password" value={creds.password} onChange={handleChange} required placeholder='Enter Admin Password' />

                    <input type="text" id="globalRegistrationNo" name="registration_no" value={creds.registration_no} onChange={handleChange} required placeholder='Enter Global Registration Number' />

                    <input type="submit" value="Submit" id='submit_div' />

                    <p onClick={handleClick}>Already a user want to login</p>
                </form>
            </div>
        </PageTransition>
    )
}

export default AdminSignup
