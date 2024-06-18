import React, { useContext, useEffect } from 'react'
import "../Css/Navbar.css"
import Logo from "../assets/lgoo.png"
import { useLocation, useNavigate } from 'react-router-dom'
import eContext from '../context/everything_context/eContext'

const Navbar = (props) => {

  const context = useContext(eContext)
  const { navIconBeeping, setNavIconBeeping } = context
  const navigate = useNavigate()
  const location = useLocation()


  const handleClick = (e) => {
    navigate(e)
  }
  
  const handleClickViaLoader = (next_page_url) => {
    setNavIconBeeping(false)
    if(location.pathname != "/ticket")
    navigate("/loadermain", {
      state : {
        next_page_url : next_page_url
      }
    })
  }

  return (
    <>
      <nav>
        {/* <h1>MoVIE MaESTRO</h1> */}
        <img src={Logo} alt="" srcset="" style={{width : "12vw", height : "4.5vw", filter : "brightness(1)", marginLeft : "0.25vw"}}/>
        <div>
          <h4 onClick={() => { handleClick('/landing') }} id='home'>Home</h4>
          <h4 id='about' onClick={() => {handleClick('/about')}}>About</h4>
          <h4 id='service'>Services {props.x}</h4>
        </div>
        <div className='nav-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket" onClick={() => { handleClickViaLoader('/ticket') }} style={{marginRight : "0.5vw"}}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
          <div className={navIconBeeping === true ? "nav-icon-over-on" : "nav-icon-over-off"}></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
