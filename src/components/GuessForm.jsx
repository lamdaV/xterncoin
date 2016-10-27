import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Jumbotron, ListGroup, ListGroupItem} from "react-bootstrap";
import GuessActions from "../actions/GuessActions.jsx";
import GuessStore from "../stores/GuessStore.jsx";
var rn = require("random-number"); // does not support es6.

class GuessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      guess: "",
      status: true,
      guessStatus: null,
      coins: 0,
      intervalId: null,
      automation: false
    };

    this.validateUserId = this.validateUserId.bind(this);
    this.validateGuess = this.validateGuess.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleGuessChange = this.handleGuessChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guessStatus = this.guessStatus.bind(this);
    this.isInt = this.isInt.bind(this);
    this.startGuessing = this.startGuessing.bind(this);
    this.stopGuessing = this.stopGuessing.bind(this);
    this.automatedGuessing = this.automatedGuessing.bind(this);
  }

  /*
    Evaluates if a given value is an integer.

    Source: https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  */
  isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

  /*
    Validates if the UserId input box is an integer.
  */
  validateUserId() {
    if (this.state.userId) {
      if (this.isInt(this.state.userId)) {
        return "success";
      }
      return "error";
    }
    return "warning";
  }

  /*
    Validates if the Guess input box is an integer.
  */
  validateGuess() {
    if (this.state.guess) {
      if (this.isInt(this.state.guess)) {
        return "success";
      }
      return "error";
    }
    return "warning";
  }

  /*
    Handle the event when text is type in the UserId input box.
  */
  handleUserIdChange(event) {
    event.preventDefault();
    this.setState({userId: event.target.value});
  }

  /*
    Handle the event when text is type in the Guess input box.
  */
  handleGuessChange(event) {
    event.preventDefault();
    this.setState({guess: event.target.value});
  }

  /*
    Handle the event when the submit button is typed.
  */
  handleSubmit(event) {
    // Ensure event exist (for automation when null is passed in).
    if (event) {
      event.preventDefault();
    }

    // Validate input.
    console.log("submit clicked");
    if (this.validateUserId() !== "success" || this.validateGuess() !== "success") {
      this.setState({status: false});
      return;
    }

    // Set the status and send a post request.
    this.setState({status: true});
    var userId = this.state.userId;
    var guess = this.state.guess;
    GuessActions.postGuess(userId, guess);
  }

  /*
    Set data once the store returns data.
  */
  guessStatus(event, data) {
    console.log(JSON.stringify(data));
    this.setState({guessStatus: data.guessStatus, coins: data.coins});
  }

  /*
    Starts automates guessing.
    Note: that the event parameter is there to handle the default action.
  */
  startGuessing(event) {
    event.preventDefault();
    if (this.validateUserId() !== "success") {
      this.setState({status: false});
      return;
    }
    var generator = rn.generator({
      min: 0,
      max: 10,
      integer: true
    });

    var intervalId = window.setInterval(this.automatedGuessing, 1200, generator);
    this.setState({intervalId: intervalId, automation: true});
  }

  /*
    Automates guessing.
  */
  automatedGuessing(generator) {
    this.setState({guess: generator()});
    this.handleSubmit(null);
  }

  /*
    Stops automated guessing.
  */
  stopGuessing(event) {
    event.preventDefault();
    window.clearInterval(this.state.intervalId);
    this.setState({intervalId: null, automation: false});
  }

  /*
    When the component mounts, setup the store listener.
  */
  componentWillMount() {
    this.unsubscribe = GuessStore.listen(this.guessStatus);
  }

  /*
    When the component is about to unmount, unsubscribe from the store.
  */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /*
    Render the component.
  */
  render() {
    // Create the message box above the submit button.
    var message = null;
    if (this.state.guessStatus) {
      message = (
        <ListGroup>
          <ListGroupItem bsStyle="success">
            Input Sucess <br/>
            Coins: {this.state.coins}
          </ListGroupItem>
        </ListGroup>
      );
    } else if (this.state.guessStatus === false) {
      message = (
        <ListGroup>
          <ListGroupItem bsStyle="danger">
            Input Failed <br/>
            Coins: {this.state.coins}
          </ListGroupItem>
        </ListGroup>
      );
    } else if (!this.state.status) {
      message = (
        <ListGroup>
          <ListGroupItem bsStyle="danger">
            Inputs Invalid
          </ListGroupItem>
        </ListGroup>
      );
    } else {
      message = (
        <div></div>
      );
    }

    // Show Automation button or Stop Automation button.
    var automationButton = null;
    if (this.state.automation) {
      automationButton = (
        <Button bsStyle="danger" bsSize="large" block onClick={this.stopGuessing}>
          Stop Automation
        </Button>
      );
    } else {
      automationButton = (
        <Button bsStyle="warning" bsSize="large" block onClick={this.startGuessing}>
        Automate
        </Button>
      );
    }

    return (
      <div>
        <Jumbotron>
          <h1> How To Use: </h1>
            <p>
              1. Enter an integer as a UserID and an integer as a guess. <br/>
              2. Hit the Submit button. If you are correct you will see a green box with a
              message that includes the number of coins.
              Otherwise, you will see a red box with a message that includes the number of
              coins currently held.
              <br/>
            </p>

            <h1> To Automate: </h1>
              <p>
                1. Enter an integer as a UserID. <br/>
                2. Hit the Automate button. <br/>
                3. It will change to a Stop Automation button; however, every 1.2 seconds,
                a guess will be made for you.
              </p>
          <form>
            <FormGroup controlId="userId" validationState={this.validateUserId()}>
              <ControlLabel>
                UserID:
              </ControlLabel>
              <FormControl type="text" value={this.state.userId} placeholder="UserID" onChange={this.handleUserIdChange} />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="guess" validationState={this.validateGuess()}>
              <ControlLabel>
                Guess:
              </ControlLabel>
              <FormControl type="text" value={this.state.guess} placeholder="Guess" onChange={this.handleGuessChange} />
              <FormControl.Feedback />
            </FormGroup>
          </form>

          {message}

          <Button bsStyle="primary" bsSize="large" block onClick={this.handleSubmit}>
            Submit
          </Button>

          {automationButton}

        </Jumbotron>
      </div>
    );
  }
}

export default GuessForm;
