const Rating = require("../models/rating.model");

const rateMovie = async (req, res) => {
	try {
		const movieId = req.params.movieId;

		const { rating, text } = req.body;

		const newrating = new Rating({
			rating,
			movieId,
			text,
		});
		await newrating.save();

		res.status(200).send("rating added successfully");
	} catch (error) {
		console.log(error);
	}
};

const updateMovieRating = async (req, res) => {
	try {
		const reviewId = req.params.reviewId;

		// console.log(reviewId);

		const updateMovie = await Rating.findByIdAndUpdate(
			reviewId,
			{
				...req.body,
			},
			{ new: true }
		);

		if (updateMovie) {
			res.status(200).send("Rating updated Succesfully");
		} else {
			res.status(404).send("Rating failed to update");
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteMovieRating = async (req, res) => {
	try {
		const reviewId = req.params.reviewId;

		const deleteMovie = await Rating.findByIdAndDelete({ _id: reviewId });

		if (deleteMovie) {
			res.status(200).send("rating deleted successfully ");
		} else {
			res.status(404).send("rating failed to delete");
		}
	} catch (error) {
		console.log(error);
	}
};

const ListofReviews = async (req, res) => {
	try {
		const movieId = req.params.movieId;

		const movieList = await Rating.find({ movieId });

		if (movieList) {
			res.status(200).send(movieList);
		} else {
			res.status(404).send("Cannot get any list");
		}
	} catch (error) {
		console.log(error);
	}
};

const averageRating = async (req, res) => {
	try {
		const movieId = req.params.movieId;

		// const movies = await Rating.find({ movieId });

		// (err, movies) => {
		// 	if (err) {
		// 		console.error("Error retrieving ratings:", err);
		// 		return;
		// 	}

		// 	if (movies.length > 0) {
		// 		const totalRating = movies.reduce(
		// 			(acc, movie) => acc + movie.rating,
		// 			0
		// 		);
		// 		const avgRating = totalRating / movies.length;
		// 		res.status(200).send(avgRating);
		// 	} else {
		// 		res.status(404).send("average rating got failed");
		// 	}
		// };

		// await Rating.find({ movieId })
		// 	.then((err, movies) => {
		// 		if (err) {
		// 			console.error("Error retrieving ratings:", err);
		// 			return;
		// 		}

		// 		if (movies.length > 0) {
		// 			const totalRating = movies.reduce(
		// 				(acc, movie) => acc + movie.rating,
		// 				0
		// 			);
		// 			const avgRating = totalRating / movies.length;
		// 			res.status(200).send(avgRating);
		// 		} else {
		// 			res.status(404).send("average rating got failed");
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.error("Error retrieving ratings:", err);
		// 	});

		const movies = await Rating.find({ movieId });

		if (movies.length > 0) {
			const totalRating = movies.reduce((acc, movie) => acc + movie.rating, 0);
			const avgRating = totalRating / movies.length;

			res.status(200).send({ avgRating });
		} else {
			res.status(404).send("average rating got failed");
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	rateMovie,
	updateMovieRating,
	deleteMovieRating,
	ListofReviews,
	averageRating,
};
