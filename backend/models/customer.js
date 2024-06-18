const mongoose = require("mongoose");
const { Schema } = mongoose;
// const autoIncrement = require('mongoose-auto-increment');

const CustomerSchema = new Schema({

    name : {
        type: String,
    },

    email : {
        type : String,
    },

    password : {
        type : String,
    },

})

// CustomerSchema.plugin(autoIncrement.plugin, {model : 'cart', field : 'cartCount', startAt : 1, incrementBy : 1});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
