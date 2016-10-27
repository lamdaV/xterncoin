import Reflux from "reflux";
import GuessActions from "../actions/GuessActions.jsx";
import http from "../services/httpService.js";

var GuessStore = Reflux.createStore({
  /*
    Listen to the GuessActions.
  */
  listenables: [GuessActions],

  /*
    Initialize variables.
  */
  init() {
    this.data = null;
  },

  /*
    Send a guess to the server.
  */
  postGuess(userId, guess) {
    console.log("postGuess Store received");
    var data = {
      userId: userId,
      guess: guess
    };

    http.post("/submit", data).then(function(dataJSON) {
      this.data = dataJSON;
      this.returnStatus();
    }.bind(this));
  },

  /*
    Fire a to listeners.
  */
  returnStatus() {
    this.trigger("change", this.data);
    this.data = null;
  }
});

export default GuessStore;
