const mongoose = require('mongoose')
const availableMovie = require('../backend/models/availableMovie')
const availableMovieJson = require("../backend/available_movie.json")
const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect("mongodb://127.0.0.1:27017/movie_maestro");
      await availableMovie.deleteMany();
      await availableMovie.create(availableMovieJson)
      console.log("Movies are uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  connectToMongo();
//   module.exports = connectToMongo;