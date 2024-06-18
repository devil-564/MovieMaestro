import React, { useContext, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import eContext from '../context/everything_context/eContext'
import AdminAddMovie from './AdminAddMovie'
import PageTransition1 from './PageTransition1'
import "../Css/AdminHome.css"
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'


const AdminHome = () => {
  const navigate = useNavigate()
  const context = useContext(eContext)
  const { pageSwapCount, availableMovie, setavailableMovie, getAdminDetails, adminName, deleteMovie } = context

  const fetchAvailableMovies = async () => {
    const response = await fetch('http://localhost:3000/api/movie/getavailablemovies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    setavailableMovie(data)
  }


  const handleClickViaLoader = (next_page_url, title) => {
    // setNavIconBeeping(false)
    if (availableMovie.length > 1)
      deleteMovie(title)
    else
      alert("Sorry atleast one movie should be there in theatre")

      
    if (location.pathname != "/ticket")
      navigate("/loadermain", {
        state: {
          next_page_url: next_page_url
        }
      })
  }

  useEffect(() => {
    fetchAvailableMovies()
    getAdminDetails()

    return () => { }
  }, [])

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <AdminNavbar />
      {pageSwapCount == 0 ?

        <PageTransition1>
          <div id='admin_home_container'>
            <h1>Hey Admin, {adminName}</h1>
            <br />
            <h1>All available movies</h1>
            <div id='movie_card_container'>
              {availableMovie.map((e) => {
                return <div id='movie_card'>

                  <img src={e.image[0]} alt="" srcset="" />
                  <h1>{e.title}</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2" onClick={() => handleClickViaLoader("/adminhome", e.title)}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                </div>
              })}
            </div>
          </div>
        </PageTransition1>

        :

        <AdminAddMovie />}
    </div>
  )
}

export default AdminHome
