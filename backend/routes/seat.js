const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router();
const Seat = require("../models/seat")

router.post("/allotpurchasedseat", [
    body("movie_name", "Enter Movie Name")
], async (req, res) => {
    let success = false;
    const errors = validationResult(req)

    if (!errors.isEmpty()) res.status(400).json({ error: errors.array(), success: success })

    let verifyForMovie = await Seat.findOne({
        movie_name: req.body.movie_name
    })

    console.log(req.body.seat_location)

    // Checking weather a movie is already inside the database then we have to update the seat_location

    if (verifyForMovie) {
        let combined_array = verifyForMovie.seat_location.concat(req.body.seat_location)

        await Seat.updateOne({ movie_name: req.body.movie_name }, { $set: { seat_location: combined_array } },)

        verifyForMovie = await Seat.findOne({
            movie_name: req.body.movie_name
        })
        
        success = true

        return res.status(200).json({success : success , data: verifyForMovie })
    }


    try {

        const allotSeat = await Seat.create({
            movie_name: req.body.movie_name,
            seat_location: req.body.seat_location
        })

        console.log(allotSeat);
        success = true;
        res.status(200).json({ data: allotSeat, success: success })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/getallotedseat', [
    body("movie_name", "Enter Movie Name")
], async (req, res) => {

    let success = false;
    const errors = validationResult(req)

    if (!errors.isEmpty()) res.status(400).json({ error: errors.array(), success: success })

    const getAllocatedSeat = await Seat.findOne({movie_name : req.body.movie_name})

    
    if(!getAllocatedSeat){
        return res.status(200).json({success : success, data : []})
    }
    
    success = true;

    return res.status(200).json({success : success, data : getAllocatedSeat.seat_location})

})




module.exports = router