const mongoose = require("mongoose")
const { Schema, model } = mongoose

const seatSchema = new Schema({

    movie_name : {
        type : String,
        require : true
    },

    seat_location: {
        type : Array,
        require : true
    },

    show_date : {
        type : String
    },
    
    show_time : {
        type : String
    }

})

const Seat = model("Seat", seatSchema)

module.exports = Seat
