const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
	rating: {
		type: Number,
		required: true,
	},
	movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
	text: {
		type: String,
		trim: true,
	},
});

const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;
