import React from 'react'
import "../Css/About.css"
import PageTransition from './PageTransition'

const About = () => {
  return (
    <PageTransition>
      <div id='outer_container'>
        <div id='heading_container'>
          <marquee behavior="scroll" direction="" scrollamount="10">ABOUT US</marquee>
        </div>

        <div id='outer_about_container'>
          <div id='inner_about_us_container'>
            <div id='about_us_container'>
              <h1>Welcome to Movie Maestro, your premier destination for seamless movie ticket management! At Movie Maestro, we understand the thrill of the silver screen and the joy of sharing unforgettable cinematic moments with loved ones. Our platform is designed to elevate your movie-going experience by providing a user-friendly interface for effortless ticket booking and management.
                <br />
                <br />
                Founded with a passion for film and a commitment to convenience, Movie Maestro simplifies the entire movie ticketing process. Whether you're a cinephile looking to plan your next cinematic adventure or a casual moviegoer seeking hassle-free ticketing, we've got you covered.
                <br />
                <br />
                Explore the latest movie listings, discover showtimes, and secure your seats with just a few clicks. Movie Maestro also offers personalized accounts, allowing you to track your booking history, receive exclusive offers, and enjoy a tailored cinema experience.
                <br />
                <br />
                Embrace the future of movie ticket management with Movie Maestro, where entertainment meets efficiency. Join us in creating memories, one ticket at a time. Experience the magic of cinema with Movie Maestro today!</h1>
            </div>
            <div id='team_container'>
              <h1 style={{ marginBottom: "3vw" }}>OUR TEAM</h1>
              <h2 style={{ marginBottom: "2vw" }}>Mohd Irfan Lohar</h2>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default About
