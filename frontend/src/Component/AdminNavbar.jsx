import React, { useContext, useEffect, useState } from 'react'
import "../Css/AdminNavbar.css"
import Image from "../assets/lgoo.png"
import eContext from '../context/everything_context/eContext'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const context = useContext(eContext)
    const {setpageSwapCount } = context

    const handleClick = (pid,id,params) => {
        const previd = document.getElementById(pid)
        const cid = document.getElementById(id)

        previd.classList.value = 'not_round_border'
        cid.classList.value = 'round_border'
        
        setpageSwapCount(params)
    }

    const handleClicknav = (e)=> {
        // alert("Please make sure you are logged in with your account")
        navigate(e)
    }

    useEffect(() => {
        if(!localStorage.getItem('token'))
            navigate('/adminlogin')
    }, [])

    return (
        <nav id='admin_navbar'>
            <img src={Image} alt="" />
            <div id='nav_s_container'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home" onClick={() => {handleClick('addmovie','home',0)}} id='home' className='round_border'><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle" onClick={() => {handleClick('home','addmovie',1)}} id='addmovie' className='not_round_border'><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-door-open" id='door_out' onClick={() => {handleClicknav('/')}}><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" /></svg>
        </nav>
    )
}

export default AdminNavbar
