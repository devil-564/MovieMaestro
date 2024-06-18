const mongoose = require("mongoose");
const { Schema } = mongoose;
// const autoIncrement = require('mongoose-auto-increment');

const AdminSchema = new Schema({

    name : {
        type: String,
    },

    email : {
        type : String,
    },

    password : {
        type : String,
    },

    registration_no : {
        type : String,
    }

})

// CustomerSchema.plugin(autoIncrement.plugin, {model : 'cart', field : 'cartCount', startAt : 1, incrementBy : 1});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
