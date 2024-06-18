import React, { useContext, useEffect, useState } from 'react';
import '../Css/Ticket.css';
import EContext from '../context/everything_context/eContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Ticket = () => {
  const context = useContext(EContext);
  const navigate = useNavigate()
  const { userDetails, getuserDetails, getuserTickets, userTickets, setNavIconBeeping} = context;
  // const [loaderCheck, setloaderCheck] = useState(false)


  useEffect(() => {
    getuserDetails();
    getuserTickets();


    // setTimeout(() => {
    //   setloaderCheck(true)
    // }, 3000);

    // return () => {

    // }
  }, []);

  const handleClick = (e) => {
    navigate(e)
  }

  const handleCancel = (id, seat_location, movie_name) => {
    alert("Are you sure you want to cancel your movie ticket")
    let check;
    if(true){
      check = prompt("Type yes if you want to delete the movie ticket")
    }

    if(check == 'Yes'){

        const deleteTicket = async () => {
          const response = await fetch("http://localhost:3000/api/movie/deleteticket", {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({id, seat_location, movie_name})
          })

          const data = await response.json();

          if(data.success){
            setNavIconBeeping(true);
            navigate('/landing');
          }
        }

        console.log("Yes")
        deleteTicket();
    }

  }

  return (
    <>
    {userTickets.length > 0 ? (userTickets.length > 0 && (
        <div id='ticket-main-container'>
          <div id='user-container'>
            <span>
              <h1>{userDetails.user_name}</h1>
            </span>
            <span>
              <h1>Tickets Area</h1>
            </span>
          </div>


          <div id='ticket-container'>
            {userTickets.map((e) => (
              <div id='ticket'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" id='cancel-btn' onClick = {() => {handleCancel(e._id, e.seat_location, e.movie_name)}}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span id='ticket-section1'>
                  <img src={e.movie_image} alt='movie_image' />
                  <h1>{e.movie_name}</h1>
                </span>

                <h1 id='ticket-section-seat-list'>
                  Booked Seats : {e.seat_location.toString()}
                </h1>

                <span id='ticket-section2'>
                  <h1>Date : {e.show_date}</h1>
                  <h1>Time : {e.show_time}</h1>
                </span>
              </div>
            ))}

          </div>
          <h1 id='logout-button' onClick={() => { handleClick('/') }}>LOGOUT</h1>
          {/* <Loader loaderCheck = {loaderCheck}/> */}
        </div>
      )) : (<marquee scrollamount = {30} id="alert-no-ticket-found">No Tickets Found</marquee>)}
    </>
  );
};

export default Ticket;
