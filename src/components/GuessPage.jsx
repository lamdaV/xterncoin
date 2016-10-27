import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import GuessForm from "./GuessForm.jsx";

class GuessPage extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row >
            <Col sm={12} md={12} lg={12}>
              <GuessForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default GuessPage;
