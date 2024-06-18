import React, { useContext } from 'react'
import EContext from "../context/everything_context/eContext";
import "../Css/Individual.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from './Loader';

const IndividualMovie = () => {
  const host = "http://localhost:3000"
  const navigate = useNavigate()

  const context = useContext(EContext)
  const { individualAvailableMovie, ticketPrice, setTicketPrice, selectedSeatRecord, setSelectedSeatRecord, setTicketDetails, ticketDetails, generateTicket, userDetails, getuserDetails, setNavIconBeeping, allotPurchasedSeats, setSelSeatRecordLocalStorage } = context;

  let count = 0;
  let ascii_value = 65;
  let seat_no = 1
  let seat_l_array = [];
  const [loaderCheck, setloaderCheck] = useState(false)

  const [showTime, setshowTime] = useState("")
  const [showDate, setshowDate] = useState("")

  const getallotPurchasedSeats = async (movie_name) => {
    const response = await fetch(`${host}/api/seat/getallotedseat`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movie_name })
    })

    const data = await response.json();
    seat_l_array = data.data
    console.log(seat_l_array)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getallotPurchasedSeats(individualAvailableMovie.title)
      await getuserDetails()
      setTicketPrice(0)
      setSelectedSeatRecord([])
    }

    fetchData();

    setTimeout(() => {
      setloaderCheck(true)
      addingSeat();
    }, 3000);

    return () => {

    }
  }, [individualAvailableMovie.title])


  useEffect(() => {
    const newTicketDetails = {
      user_name: userDetails.user_name,
      movie_name: individualAvailableMovie.title,
      movie_image: individualAvailableMovie.image[0],
      show_date: showDate, // Update dynamically based on user selection
      show_time: showTime, // Update dynamically based on user selection
      ticket_price: ticketPrice,
    };

    setTicketDetails(newTicketDetails);
    setSelSeatRecordLocalStorage(selectedSeatRecord);
  }, [ticketPrice, showDate, showTime])


  function handleSeatClick(e) {
    console.log(e)
    const selected_seat_div = document.getElementById(e);

    if (selected_seat_div.style.backgroundColor != 'red') {
      selected_seat_div.style.backgroundColor = 'red';
      if (e <= 22)
        setTicketPrice(ticketPrice => ticketPrice + 100);
      else if (e > 22 && e <= 66)
        setTicketPrice(ticketPrice => ticketPrice + 170);

      else if (e > 67 && e <= 77)
        setTicketPrice(ticketPrice => ticketPrice + 250);

      // setSelectedSeatRecord(selectedSeatRecord.push(e)); //storing this for overall seat_location table
      setSelectedSeatRecord(prevSelectedSeatRecord => [...prevSelectedSeatRecord, e]);
      console.log(selectedSeatRecord)
    }

    else {
      console.log("Seat is already booked")
    }
  }





  const addingSeat = () => {
    const seatContainer = document.getElementById("seat-container");

    if (count == 0) {
      // First loop
      for (let i = 1; i <= 120; i++) {
        // For Numbers
        if (i <= 12) {
          const seatDivNumber = document.createElement("div");
          seatDivNumber.classList.add('seat-div-number');
          seatDivNumber.innerText = i;
          seatContainer.appendChild(seatDivNumber);
        }

        // For Gap
        else if (i >= 37 && i <= 48 || i >= 97 && i <= 108) {
          const seatDivNumber = document.createElement("div");
          seatDivNumber.classList.add('seat-div-number');
          seatDivNumber.innerText = "";
          seatContainer.appendChild(seatDivNumber);
        }

        // For Alphabets
        else if (i == 13 || i == 25 || i == 49 || i == 61 || i == 73 || i == 85 || i == 109) {
          const seatDivNumber = document.createElement("div");
          seatDivNumber.classList.add('seat-div-number');
          seatDivNumber.innerText = String.fromCharCode(ascii_value);
          seatContainer.appendChild(seatDivNumber);
          ascii_value = ascii_value + 1
        }

        // For Seats
        else {
          const seatDiv = document.createElement("div");
          seatDiv.classList.add('seat-div');
          seatDiv.id = seat_no
          seatContainer.appendChild(seatDiv);
          // console.log(seat_l_array) // Giving blank error
          let helper = seat_l_array.includes(seat_no)

          if (helper) {
            seatDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.279)'
            seatDiv.title = "Seat Not Available"
            console.log('done')
            // console.log(allotedSeatsLocation)
            seat_no += 1;
          }

          else {
            seatDiv.title = "Seat Available"
            seatDiv.onclick = ((currentSeatNo) => () => handleSeatClick(currentSeatNo))(seat_no);
            seat_no += 1
          }
        }
      }

      count++;
    }
  }

  const handleDateSelect = (d) => {
    const dateClass = document.getElementsByClassName('date')
    for (let i = 0; i < 5; i++) {
      dateClass[i].style.backgroundColor = "rgba(0, 0, 0, 0.315)"
      dateClass[i].firstChild.style.color = "white"
      dateClass[i].lastChild.style.color = "white"
    }

    const id = document.getElementById(d)
    let str = id.firstChild.textContent + " " + id.lastChild.textContent;
    id.style.backgroundColor = "white"
    id.firstChild.style.color = "black"
    id.lastChild.style.color = "black"
    setshowDate(str);
  }
  const handleTimeSelect = (timeslot) => {
    const timeClass = document.getElementsByClassName('timeslot')
    for (let i = 0; i < 4; i++) {
      timeClass[i].style.backgroundColor = "rgba(0, 0, 0, 0.315)"
      timeClass[i].firstChild.style.color = "white"
    }

    const timeId = document.getElementById(timeslot)
    let str = timeId.firstChild.textContent
    timeId.style.backgroundColor = "white"
    timeId.firstChild.style.color = "black"
    setshowTime(str);
  }

  const beforehandleTicketBooking = () => {
    setTimeout(() => {
      handleTicketBooking()
    }, 500);
  }

  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/stripe/charge", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: 1,
              price: parseFloat(ticketDetails.ticket_price),
              name: ticketDetails.movie_name
            },
          ],
        })
      })
      const data = await res.json()
      console.log(data);
      window.location = data.url
    } catch (error) {
      console.table(error)
    }

    // props.setstripeConfirm(data.success)
  }


  const handleTicketBooking = async () => {
    
    // const newTicketDetails = {
    //   user_name: userDetails.user_name,
    //   movie_name: individualAvailableMovie.title,
    //   movie_image: individualAvailableMovie.image[0],
    //   show_date: showDate, // Update dynamically based on user selection
    //   show_time: showTime, // Update dynamically based on user selection
    //   ticket_price: ticketPrice,
    // };

    // setTicketDetails(newTicketDetails);
    // setSelSeatRecordLocalStorage(selectedSeatRecord);

    setTimeout(() => {
        checkout()
    }, 1000);

    // if (data.success) {

    //   console.log(
    //     selectedSeatRecord
    //   );

    //   allotPurchasedSeats(newTicketDetails.movie_name, selectedSeatRecord, newTicketDetails.show_date, newTicketDetails.show_time)

    //   generateTicket(
    //     newTicketDetails.user_name,
    //     newTicketDetails.movie_name,
    //     newTicketDetails.movie_image,
    //     selectedSeatRecord,
    //     newTicketDetails.show_date,
    //     newTicketDetails.show_time,
    //     newTicketDetails.ticket_price
    //   );

    //   setNavIconBeeping(true);
    //   navigate('/landing')
    // }

    // else {
    //   console.log("Payment not done successfully")
    // }
  }




  return (
    <>
      <div id='individual-container'>
        <img src={individualAvailableMovie.image[1]} alt="" srcset="" />
        <br />
        <br />
        <br />
        <div id='ticket-processing-container'>
          <div id='individual-sub-container'>
            {loaderCheck == true ? (<h3>BOOK YOUR SEAT</h3>) : (<h3></h3>)}
            <br />
            <div id='seat-selection-container'>
              <div id='seat-container' style={{ display: loaderCheck == true ? "grid" : "none" }}>
              </div>
              <Loader loaderCheck={loaderCheck} />
            </div>
          </div>

          <div id='individual-sub-container2'>
            <h3>Select Date</h3>
            <div id='date-container'>
              <div class="date" id="date1" onClick={() => handleDateSelect("date1")}>
                <span>Dec</span>
                <h4>1</h4>
              </div>
              <div class="date" id="date2" onClick={() => handleDateSelect("date2")}>
                <span>Dec</span>
                <h4>2</h4>
              </div>
              <div class="date" id="date3" onClick={() => handleDateSelect("date3")}>
                <span>Dec</span>
                <h4>3</h4>
              </div>
              <div class="date" id="date4" onClick={() => handleDateSelect("date4")}>
                <span>Dec</span>
                <h4>4</h4>
              </div>
              <div class="date" id="date5" onClick={() => handleDateSelect("date5")}>
                <span>Dec</span>
                <h4>5</h4>
              </div>
            </div>
            <h3>Select Showtime</h3>
            <div id='timeslot-container'>
              <div class="timeslot" id='timeslot1' onClick={() => handleTimeSelect("timeslot1")}>
                <h4>9:00 AM</h4>
              </div>
              <div class="timeslot" id='timeslot2' onClick={() => handleTimeSelect("timeslot2")}>
                <h4>12:00 PM</h4>
              </div>
              <div class="timeslot" id='timeslot3' onClick={() => handleTimeSelect("timeslot3")}>
                <h4>3:00 PM</h4>
              </div>
              <div class="timeslot" id='timeslot4' onClick={() => handleTimeSelect("timeslot4")}>
                <h4>6:00 PM</h4>
              </div>
            </div>
            <div id='line'></div>
            <h1 id='heading2'>Billing Section</h1>
            <div id='ticket-purchase-area'>
              <h1 id='heading3'>{ticketPrice} Rs<mark> Only </mark></h1>
              <motion.div
                id='book-ticket-btn' onClick={beforehandleTicketBooking}>Book Ticket</motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndividualMovie
