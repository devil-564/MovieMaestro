import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EContext from "../context/everything_context/eContext";
import "../Css/Landing.css"
import PageTransition from './PageTransition';


const Landing = () => {
  const context = useContext(EContext);
  const navigate = useNavigate();
  const { availableMovie, setavailableMovie, index, setIndex, setIndividualAvailableMovie } = context

  const fetchAvailableMovies = async () => {
    const response = await fetch('http://localhost:3000/api/movie/getavailablemovies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data)
    setavailableMovie(data)
    setIndividualAvailableMovie(availableMovie[0])
    setIndex(0);
  }

  const nextHandleClick = () => {
    if (index == 0 && availableMovie.length > 1) {
      setIndividualAvailableMovie(availableMovie[1])
      setIndex(1);
    }

    else if (index == 1 && availableMovie.length > 2) {
      setIndividualAvailableMovie(availableMovie[2])
      setIndex(2)
    }

    else {
      setIndividualAvailableMovie(availableMovie[0])
      setIndex(0)
    }
  }

  const bookHandleClick = () => {
    if (localStorage.getItem('token') == null) {
      alert("Please make sure that you are logged in with your account")
      navigate("/login")
    }
    else {
      navigate("/individual")
    }
  }

  useEffect(() => {
    fetchAvailableMovies();
  }, [])

  return (
    <>
      <PageTransition>
        <div id='landing-container'>
          {availableMovie.length > 0 && (
            <>
              <img src={availableMovie[index].image[0]} alt="" srcSet="" />
              <div id='landing-sub-container'>
                <h1>{availableMovie[index].title}</h1>
                <h3>{`${availableMovie[index].genre[0]} / ${availableMovie[index].genre[1]} / ${availableMovie[index].genre[2]}`}</h3>
                <h3>{`${availableMovie[index].rating} / 10`}</h3>
                <p>{availableMovie[index].description}</p>
              </div>
            </>
          )}
          <div id='book_btn' onClick={bookHandleClick}>Book Movie</div>
          <div id='next_btn' onClick={nextHandleClick}>Next Movie</div>
        </div>
      </PageTransition>
    </>
  )
}

export default Landing
