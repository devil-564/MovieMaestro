import React from 'react'
import "../Css/ChoosingSection.css"
import Theatre from "../assets/compress_theatre-admin.jpg";
import Customer from "../assets/customer_compress.jpg";
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const ChoosingSection = () => {
  const navigate = useNavigate();

  const handleClick = (e)=>{
    navigate(e)
  }

  return (
    <>
      <div id='main-container' style={{position : 'relative'}}>
        <BackButton />
        <div id='sub-container'>
            <div id='sub-sub-container'>
                <img src={Theatre} alt="admin" srcset="" onClick={() => {handleClick("/adminsignup")}} loading='lazy'/>
                <h1 id='admin-text'>ADMIN</h1>
            </div>
            <div>
                <img src={Customer} alt="customer" onClick={() => {handleClick("/signup")}} loading='lazy'/>
                <h1>CUSTOMER</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default ChoosingSection
