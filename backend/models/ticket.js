const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema({

    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },

    user_name : {
        type : String,
    },

    movie_name : {
        type : String,
    },

    movie_image : {
        type : String,
    },

    seat_location : {
        type : Array
    },

    show_date : {
        type : String
    },

    show_time : {
        type : String
    },

    ticket_price : {
        type : Number,
    },


    ticket_issueDate : {
        type : Date,
        default : Date.now()
    }

})


const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
