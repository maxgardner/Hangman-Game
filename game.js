// Game piece variables

var movies = [
	{
		title: "halloween",
		year: "1978",
		image: "assets/images/halloween.jpeg"
	},
	{
		title: "scream",
		year: "1996",
		image: "assets/images/scream.jpeg"
	},
	{
		title: "a nightmare on elm street",
		year: "1984",
		image: "assets/images/anightmareonelmstreet.jpeg"
	},
	{
		title: "black christmas",
		year: "1974, 2006",
		image: "assets/images/blackchristmas.jpeg"
	},
	{
		title: "psycho",
		year: "1960",
		image: "assets/images/psycho.jpeg"
	},
	{
		title: "texas chainsaw massacre",
		year: "1974, 2003",
		image: "assets/images/thetexaschainsawmassacre.jpeg"
	},
	{
		title: "the exorcist",
		year: "1973",
		image: "assets/images/theexorcist.jpeg"
	},
	{
		title: "the shining",
		year: "1980",
		image: "assets/images/theshining.jpeg"
	},
	{
		title: "the evil dead",
		year: "1981, 2013",
		image: "assets/images/theevildead.jpeg"
	},
	{
		title: "it follows",
		year: "2014",
		image: "assets/images/itfollows.jpeg"
	},
	{
		title: "the silence of the lambs",
		year: "1991",
		image: "assets/images/thesilenceofthelambs.jpeg"
	},
	{
		title: "the conjuring",
		year: "2013",
		image: "assets/images/theconjuring.jpeg"
	},
	{
		title: "the thing",
		year: "1982, 2011",
		image: "assets/images/thetexaschainsawmassacre.jpeg"
	},
	{
		title: "rosemary's baby",
		year: "1968",
		image: "assets/images/rosemarysbaby.jpeg"
	},
	{
		title: "sinister",
		year: "2012",
		image: "assets/images/sinister.jpeg"
	},
	{
		title: "rec",
		year: "2007",
		image: "assets/images/thetexaschainsawmassacre.jpeg"
	},
	{
		title: "poltergeist",
		year: "1982, 2005",
		image: "assets/images/poltergeist.jpeg"
	},
	{
		title: "night of the living dead",
		year: "1968, 2004",
		image: "assets/images/nightofthelivingdead.jpeg"
	},
	{
		title: "saw",
		year: "2004",
		image: "assets/images/saw.jpeg"
	},
	{
		title: "the ring",
		year: "2002",
		image: "assets/images/thering.jpeg"
	},
	{
		title: "paranormal activity",
		year: "2007",
		image: "assets/images/paranormalactivity.jpeg"
	},
	{
		title: "the omen",
		year: "1976, 2006",
		image: "assets/images/theomen.jpeg"
	},
	{
		title: "carrie",
		year: "1976, 2013",
		image: "assets/images/carrie.jpeg"
	},
	{
		title: "the strangers",
		year: "2008",
		image: "assets/images/thestrangers.jpeg"
	},
	{
		title: "the purge",
		year: "2013",
		image: "assets/images/thepurge.jpeg"
	},
	{
		title: "dawn of the dead",
		year: "1978, 2004",
		image: "assets/images/dawnofthedead.jpeg"
	},
	{
		title: "the hills have eyes",
		year: "1977, 2006",
		image: "assets/images/thehillshaveeyes.jpeg"
	},
	{
		title: "final destination",
		year: "2006",
		image: "assets/images/finaldestination.jpeg"
	},
	{
		title: "cloverfield",
		year: "2008",
		image: "assets/images/cloverfield.jpeg"
	},
	{
		title: "the grudge",
		year: "2004",
		image: "assets/images/thegrudge.jpeg"
	},
	{
		title: "jeepers creepers",
		year: "2013",
		image: "assets/images/jeeperscreepers.jpeg"
	}
];
var currentMovie = [];
var usedMovies = [];
var movieTitle = [];
var moviePoster = "";
var movieNoSpace = [];
var numBlanks = 0;
var underscores = [];

// Score measurement variables

var userWord = [];
var wrongGuesses = [];
var correctGuesses = [];
var wins = 0;
var losses = 0;
var guessCount = 9;

// Set current movie along with the number of blanks needed for that movie

function setMovie() {

	// Ensure the game will reset once movies array runs out

	if (movies.length === 0) {
		alert("GAME OVER!\nRefresh to start again.");
	};

	var random = Math.floor(Math.random() * movies.length);
	currentMovie = movies[random];
	movieTitle = currentMovie.title.split("");
	var temp = currentMovie.title.split(" ").join("");
	movieNoSpace = temp.split("");
	moviePoster = currentMovie.image;
	numBlanks = movieTitle.length;
	underscores = [];

	// Loop through movie title array to generate underscores for each letter

	for (var i = 0; i < numBlanks; i++) {
		if (movieTitle[i] === " ") {
			underscores[i] = " &nbsp; ";
		} else {
			underscores[i] = "_";
		};
	};

	// Push underscores to front-end

	document.getElementById("hangman-board").innerHTML = underscores.join(" ");
	document.getElementById("release-year").innerHTML = currentMovie.year;
	usedMovies.push(movies.splice(random, 1));
	console.log(movies);
	console.log(currentMovie);
	console.log(usedMovies);
};

// Resets game

function setGame() {
	document.getElementById("hangman-board").innerHTML = "";
	setMovie();
	guessCount = 9;
	userWord = [];
	wrongGuesses = [];
	correctGuesses = [];
	document.getElementById("guess-count").innerHTML = guessCount;
	document.getElementById("wrong-guesses").innerHTML = "";
	document.getElementById("poster").setAttribute("src", "assets/images/placeholder.jpg");
};

setGame();

// Record keystroke and determine if it matches any letters in the movie title

document.onkeydown = function(e) {

	// Ensure that user has entered a valid alpha key, A-Z

	if (e.keyCode >= 65 && e.keyCode <= 90) {

		var userGuess = e.key.toLowerCase();

		if (userWord.indexOf(userGuess) === -1) {
			userWord.push(userGuess);
		};

		// Determine immediately if user's guess exists in movie title; if not, mark it wrong

		if (movieTitle.indexOf(userGuess) === -1) {

			if (wrongGuesses.indexOf(userGuess) === -1) {
				wrongGuesses.push(userGuess);
				document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(", ");
				guessCount--;

				// Grammar stuff

				if (guessCount === 1) {
					document.getElementById("guess-count").innerHTML = guessCount + " guess";
				} else {
					document.getElementById("guess-count").innerHTML = guessCount + " guesses";
				};
			};

		} else {

			// Ensure this correct letter has not already been added to correct guesses array

			if (correctGuesses.indexOf(userGuess) === -1) {

				// Loop through movieTitle to determine where letter exists, then replace that index in the underscore array
			
				for (var i = 0; i < movieTitle.length; i++) {

					if (userGuess === movieTitle[i]) {
						underscores[i] = userGuess;
						document.getElementById("hangman-board").innerHTML = underscores.join(" ");
						correctGuesses.push(userGuess);
					};
				};
			};
		};
	};
};

// Determine if user has won or lost

document.onkeyup = function(e) {

	if (correctGuesses.length === movieNoSpace.length) {
		wins++;
		document.getElementById("win-count").innerHTML = wins;
		document.getElementById("poster").setAttribute("src", moviePoster);
 		setTimeout(setGame, 5000);
	} else if (guessCount === 0) {
		losses++;
		document.getElementById("loss-count").innerHTML = losses;
		alert("L-O-S-E-R, YOU ARE A LOSER");
		setGame();
	};
}