const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SEC_KEY = "MOVIE_TICKET_MANAGEMENT_WEBAPPLICATION_111223";
const availableMovie = require('../models/availableMovie');
const ticket = require('../models/ticket')
const middleware = require('../middleware');
const Ticket = require("../models/ticket");
const Seat = require("../models/seat")

router.get('/getavailablemovies', async (_, res) => {
    const data = await availableMovie.find({});
    res.json(data);
})

router.post('/generateticket', middleware, [
    body('user_name', 'Enter user name').notEmpty(),
    body('movie_name', 'Enter movie name').notEmpty(),
    body('movie_image'),
    // body('seat_location').isArray(),
    body('show_date').notEmpty(),
    body('show_time').notEmpty(),
    body('ticket_price').notEmpty()
], async (req, res) => {

    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: success, errors: errors.array() })
        }

        const { user_name, movie_name, movie_image, seat_location, show_date, show_time, ticket_price } = req.body;

        // if a user already purchased the ticket then if user again makes a purchase of same movie 
        // const isMovie = await ticket.findOne({ movie_name: movie_name })

        console.log(user_name, movie_name, movie_image, seat_location, show_date, show_time, ticket_price)
        const ticket_in_db = await ticket.create({
            user_id: req.ticket.id,
            user_name: user_name,
            movie_name: movie_name,
            movie_image: movie_image,
            seat_location: seat_location,
            show_date: show_date,
            show_time: show_time,
            ticket_price: ticket_price
        })
        // console.log("hello")

        res.json(ticket_in_db)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured")
    }
})


router.get('/getusertickets', middleware, async (req, res) => {
    try {
        var success = false
        const userTicket = await Ticket.find({ user_id: req.ticket.id })

        if (userTicket)
            success = true;

        res.json(userTicket)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured")
    }

})

// Add Movie - Admin Side Routes

router.post('/deletemovie', [
    body("title", "Enter Movie Name"),
], async (req, res) => {
    try {

        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: success, errors: errors.array() })
        }
        console.log(req.body.title)
        const deleteMovie = await availableMovie.deleteMany({ title: req.body.title })
        console.log(deleteMovie)

        if (!deleteMovie) {
            return res.status(200).json({ success: success, results: "No movie found with this name" })
        }

        else {
            success = true
            await Seat.deleteOne({ title: req.body.title })
            return res.status(200).json({ success: success, results: "Movie has been deleted" })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured")
    }
})

// router.post('/api/movies', upload.array('images', 2), async (req, res) => {
//     const { name } = req.body;
//     const images = req.files.map(file => file.filename);

//     const newMovie = new Movie({ name, images });

//     try {
//       await newMovie.save();
//       res.json({ success: true, message: 'Movie added successfully' });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });

router.post('/addmovie', [
    body("title", "Enter movie title"),
    body("description", "Enter movie description"),
    body("rating", "Enter movie rating")
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: success, errors: errors.array() })
        }

        const { title, description, rating, genre, image } = req.body;

        const verifyMovie = await availableMovie.findOne({ title: title })

        if (verifyMovie) {
            return res.status(200).json({ success: success, error: "Already Movie Found" })
        }

        const addMovie = await availableMovie.create({
            title: title,
            description: description,
            rating: rating,
            genre: genre,
            image: image
        })

        success = true;
        return res.status(200).json({ success: success, data: addMovie })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured")
    }
})

router.post('/deleteticket', [
    body("ticketId", "Enter Ticket Id").notEmpty(),
    body("movie_name", "Enter Movie Name").notEmpty()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req.body);
    console.log(req.body)

    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors, success: success });
    }

    try {
        const res = await ticket.deleteOne({ _id: req.body.id });

        if (res) {
            let getSeats = await Seat.findOne({ movie_name: req.body.movie_name });
            let deleteSeat = req.body.seat_location;
            let deleteSeatSet = new Set(deleteSeat);

            let seatArray = getSeats.seat_location;

            seatArray = seatArray.filter((e) => {
                return !deleteSeatSet.has(e);
            })

            getSeats = await Seat.findOneAndUpdate({ movie_name: req.body.movie_name, seat_location: seatArray });

            if (getSeats)
                res.status(200).json({ success: true })
        }
    } catch (error) {
        res.status(500).json({ error: error, success: false })
    }
})

module.exports = router; 