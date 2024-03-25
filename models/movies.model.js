const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title of movie is required"],
		trim: true,
	},
	// title, director, genre, releaseYear, and description.
	director: {
		type: String,
		required: [true, "A director of movie is required"],
	},
	genre: {
		type: String,
	},
	releaseYear: {
		type: Number,
	},
	description: {
		type: String,
		trim: true,
	},
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
