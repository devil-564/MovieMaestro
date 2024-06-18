import React, { useContext, useEffect, useState } from 'react'
import PageTransition1 from './PageTransition1'
import "../Css/AdminAddMovie.css"
import eContext from '../context/everything_context/eContext'

const AdminAddMovie = () => {
  const context = useContext(eContext);
  const {availableMovie} = context;

  const [details, setDetails] = useState({
    title: "",
    description: "",
    rating: "", // make this an integer before sending it to the server
    genre1: "",
    genre2: "",
    genre3: "",
    image1: "",
    image2: ""
  });

  const [image, setimage] = useState([])
  const [genre, setgenre] = useState([])

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = ()=> {
    setimage(image.push(details.image1))
    setimage(image.push(details.image2))

    setgenre(genre.push(details.genre1))
    setgenre(genre.push(details.genre2))
    setgenre(genre.push(details.genre3))

    details.rating = parseInt(details.rating)
    
    const {title, description, rating } = details

    if(availableMovie.length < 3)
      fetchAddMovie(title, description, rating, genre, image);

    else
      alert("Threatre already have three movies")

  }

  const fetchAddMovie = async (title, description, rating, genre, image) => {
    const response = await fetch("http://localhost:3000/api/movie/addmovie", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({title, description, rating, genre, image})
    })

    const data = await response.json();

    console.log(data)
  }



  return (
    <PageTransition1>
      <div id='admin_add_movie_container'>
        <form onSubmit={handleSubmit}>
          <h1>Add Movie</h1>
          <input type="text" name="title" value={details.title} onChange={handleChange} placeholder='Enter Movie Name' required/>

          <textarea type="text" name="description" value={details.description} onChange={handleChange} placeholder='Enter Movie Description' required/>

          <input type="text" name="rating" value={details.rating} onChange={handleChange} placeholder='Enter Movie Rating'required/>

          <label htmlFor="">Enter Movie's Genre</label>
          <input type="text" name="genre1" value={details.genre1} onChange={handleChange} className="inp_left_gap" placeholder='Genre 1' required/>
          <input type="text" name="genre2" value={details.genre2} onChange={handleChange} className="inp_left_gap" placeholder='Genre 2' required/>
          <input type="text" name="genre3" value={details.genre3} onChange={handleChange} className="inp_left_gap" placeholder='Genre 3' required/>

          <label htmlFor="">Enter Moive's Image Url</label>
          <input type="text" name="image1" value={details.image1} onChange={handleChange} className="inp_left_gap" placeholder='Image 1' required/>
          <input type="text" name="image2" value={details.image2} onChange={handleChange} className="inp_left_gap" placeholder='Image 2' required/>

          <input type="submit" value="Add Movie" id='submit_btn'/>
        </form>
      </div>
    </PageTransition1>
  )
}

export default AdminAddMovie
