import React from 'react'
import "../Css/BackButton.css"
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/')
  }

  return (
    <div id='backArrowCont' onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left" id='backArrow'><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
    </div>
  )
}

export default BackButton
