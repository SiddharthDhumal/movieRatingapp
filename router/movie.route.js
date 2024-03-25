const router = require("express").Router();
const {
	addMovie,
	updateMovie,
	deleteMovie,
	getMovieById,
	getMovieLists,
} = require("../controller/movie.controller");

router.post("/", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.get("/:id", getMovieById);
router.get("/", getMovieLists);

module.exports = router;
