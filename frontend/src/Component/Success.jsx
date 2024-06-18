import React, { useContext, useEffect, useState } from 'react'
import EContext from '../context/everything_context/eContext'
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const context = useContext(EContext);
  const navigate = useNavigate();
  const {ticketDetails, generateTicket, selSeatRecordLocalStorage, setNavIconBeeping,allotPurchasedSeats } = context;
  const [timer, settimer] = useState(5)

  useEffect(() => {
    const genTicket = ()=>{
      generateTicket(
        ticketDetails.user_name,
        ticketDetails.movie_name,
        ticketDetails.movie_image,
        selSeatRecordLocalStorage,
        ticketDetails.show_date,
        ticketDetails.show_time,
        ticketDetails.ticket_price
      )
    }

    const allotPurchasedSeatsFunc = ()=>{
      allotPurchasedSeats(ticketDetails.movie_name, selSeatRecordLocalStorage);
    }

    allotPurchasedSeatsFunc();
    genTicket();
    setNavIconBeeping(true);

    const redirectTimeout = setTimeout(() => {
      navigate('/landing')
    }, 5000);

    const countdownInterval = setInterval(() => {
      settimer(timer => timer - 1)
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [])

  return (
    <>
      <h1>Your Ticket is Successfully Purchased</h1>
      <h1>And You Will Be Redirected in {timer}</h1>
    </>
  )
}

export default Success
