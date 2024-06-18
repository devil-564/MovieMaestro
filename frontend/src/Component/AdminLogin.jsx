import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Css/AdminLogin.css"
import PageTransition from './PageTransition'
import BackButton from './BackButton'

const AdminLogin = () => {
    const navigate = useNavigate()

    const [creds, setcreds] = useState({ email: "", password: "", registration_no: "" })

    const handleChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value });
    }

    const handleClick = () => {
        navigate("/adminsignup")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetching our API
        const response = await fetch("http://localhost:3000/api/admin/loginadmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creds.email, password: creds.password, registration_no: creds.registration_no }),
        })

        const data = await response.json();
        setcreds({ email: "", password: "", registration_no: "" });

        if (data.success) {
            localStorage.setItem('token', data.authtoken);
            navigate('/adminhome')
            console.log("You are successfully logged in to your account", "success");
        }

        else {
            alert("Please enter correct details to login")
            console.log("Please enter the correct details")
        }
    }

    return (
        <PageTransition>
            <div className="login-container">
                <BackButton />
                <h2 id='login_container_head_name'>MOVIE MAESTRO</h2>

                <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" id='login-container-image' />

                <form id="loginForm" onSubmit={handleSubmit}>
                    <h2> Admin Login</h2>

                    <input type="email" id="email" name="email" required value={creds.email} onChange={handleChange} placeholder='Enter Admin Email Id' />

                    <input type="password" id="password" name="password" required value={creds.password} onChange={handleChange} placeholder='Enter Admin Password' />

                    <input type="text" id="regNo" name="registration_no" required value={creds.registration_no} onChange={handleChange} placeholder='Enter Global Registration Number' />

                    <input type="submit" value="Submit" id='submit_div' />

                    <p onClick={handleClick}>Not yet registered want to sign up</p>
                </form>
            </div>
        </PageTransition>
    )
}

export default AdminLogin
