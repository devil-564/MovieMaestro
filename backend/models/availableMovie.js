const mongoose = require("mongoose");
const { Schema } = mongoose;
// const autoIncrement = require('mongoose-auto-increment');

const AvailableMovieSchema = new Schema({

    title : {
        type: String,
    },

    description : {
        type : String,
    },

    rating : {
        type : Number,
    },

    genre : {
        type : [String],
    },

    image : {
        type : [String],
    }

})

// CustomerSchema.plugin(autoIncrement.plugin, {model : 'cart', field : 'cartCount', startAt : 1, incrementBy : 1});

const AvailableMovie = mongoose.model("AvailableMovie", AvailableMovieSchema);

module.exports = AvailableMovie;
