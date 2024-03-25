const Movie = require("../models/movies.model");

const addMovie = async (req, res) => {
	try {
		const { title, director, genre, releaseYear, description } = req.body;
		const payload = {
			title,
			director,
			genre,
			releaseYear,
			description,
		};

		const newMovie = await Movie.create(payload);
		await newMovie.save();

		if (newMovie) {
			return res.status(200).send(newMovie);
		} else {
			return res.status(404).send("Cannot create new movie");
		}
	} catch (error) {
		console.log(error);
	}
};

const updateMovie = async (req, res) => {
	try {
		const movieId = req.params.id;

		const updatedMovie = await Movie.findByIdAndUpdate(
			movieId,
			{
				...req.body,
			},
			{ new: true }
		);

		if (updatedMovie) {
			return res.status(200).send(updatedMovie);
		} else {
			return res.status(500).send("Cannot update the movie");
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteMovie = async (req, res) => {
	try {
		const id = req.params.id;
		const deletedMovie = Movie.findByIdAndDelete({ _id: id });

		// delete is not working as per expectations check it later

		if (deletedMovie) {
			return res.status(200).send("Movie deleted");
		} else {
			return res.status(500).send("Cannot delete the movie");
		}
	} catch (error) {
		console.log(error);
	}
};

const getMovieById = async (req, res) => {
	const id = req.params.id;

	try {
		const movie = await Movie.findById(id);

		if (movie) {
			return res.status(200).send(movie);
		} else {
			return res.status(404).send("Movie does not found");
		}
	} catch (error) {
		console.log(error);
	}
};

const getMovieLists = async (req, res) => {
	const { genre, releaseYear, director } = req.query;

	try {
		const moviesByGenre = await Movie.find({ genre });
		const moviesByreleaseYear = await Movie.find({ releaseYear });
		const moviesByDirector = await Movie.find({ director });

		if (moviesByGenre.length > 0) {
			return res.status(200).send(moviesByGenre);
		} else if (moviesByreleaseYear.length > 0) {
			return res.status(200).send(moviesByreleaseYear);
		} else if (moviesByDirector.length > 0) {
			// console.log(moviesByDirector);
			return res.status(200).send(moviesByDirector);
		} else {
			return res.status(404).send("Movie does not found");
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	addMovie,
	updateMovie,
	deleteMovie,
	getMovieById,
	getMovieLists,
};
