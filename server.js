var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var path = require("path");
var rn = require("random-number");
var app = express();

// Set the port.
var port = process.env.PORT || 8080;

// Mock Database Table.
var bank = {
  1: 14,
  2: 30,
  3: 21,
  4: 49,
  9: 16
};

/*
  Initialize
*/
function initialize() {
  // For simplicity, the generator will generate a number in [0, 10].
  this.generator = rn.generator({
    min: 0,
    max: 10,
    integer: true
  });

  this.number = this.generator();
  console.log("[ NUMBER ] " + this.number);
}

/*
  Gzip Request.
*/
app.use(compression());

/*
  Make static files available.
*/
app.use(express.static(path.join(__dirname, "/build"), {maxAge: "1w"}));

app.all("/*", function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
  Get the number of coins the user has.
  Ideally be called in a post method. The post method would then build up
  response to send.
*/
function getCoins(userId) {
  if (!bank[userId]) {
    console.log("This user does not exist");
    return;
  }
  console.log("Coins: " + bank[userId]);
  return bank[userId];
}

/*
  Evaluate if the guess is correct.
*/
function handleGuess(userId, guess) {
  // If guess is correct, generate a new number and return true. Otherwise, false.
  if (guess === this.number) {
    console.log("[ CORRECT ]");
    this.number = this.generator();
    console.log("[ NUMBER ] " + this.number);
    return true;
  }
  console.log("[ INCORRECT ]");
  return false;
}

/*
  Process the guess.
*/
function processResponse(userId, guess) {
  // Store new userIds if not already existing.
  if (!bank[userId]) {
    bank[userId] = 0;
  }

  // Setup object to store data.
  var responseData = {
    guessStatus: null,
    coins: bank[userId]
  };

  // Handle data based on guess results.
  if (handleGuess(userId, guess)) {
    responseData.guessStatus = true;
    bank[userId]++;
    responseData.coins = bank[userId];
  } else {
    responseData.guessStatus = false;
  }
  return responseData;
}

/*
  Handle submit post request.
*/
app.post("/submit", function(request, response) {
  // Grab data.
  var dataJSON = request.body;

  // Logging.
  console.log("[ POST ] submit ");
  console.log("         userId:  " + dataJSON.userId);
  console.log("         guess:   " + dataJSON.guess);
  console.log("[ NUMBER ] " + this.number);

  // Process and send.
  var userId = dataJSON.userId; // string
  var guess = parseInt(dataJSON.guess, 10); // integer
  response.send(processResponse(userId, guess));
});

/*
  Run the server.
*/
app.listen(port, function(error) {
  if (error) {
    console.log("[ ERROR ] " + error);
  } else {
    console.log("[ STATUS ] Webserver is LIVE. " + port);
    initialize();
  }
});
