# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<!--  -->

(<div id='ticket-main-container'>
        <div id='user-container'>
          <span><h1>{userDetails.user_name}</h1></span>
          <span><h1>Tickets Area</h1></span>
        </div>

        <div id='ticket-container'>
          <div id='ticket'>
            <span id='ticket-section1'>
              <img src={userTickets[0].movie_image} alt="movie_image" />
              <h1>{userTickets[0].movie_name}</h1>
            </span>

            <h1 id='ticket-section-seat-list'>Booked Seats : {userTickets[0].seat_location.toString()}</h1>

            <span id='ticket-section2'>
              <h1>Date : {userTickets[0].show_date}</h1>
              <h1>Time : {userTickets[0].show_time}</h1>
            </span>
          </div>
        </div>
      </div>)