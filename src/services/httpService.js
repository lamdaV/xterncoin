// eslint-disable-next-line
import Fetch from "whatwg-fetch";

// Un/comment baseUrl depending on server hosting or local testing
// var baseUrl = "http://localhost:8080";
var baseUrl = "https://xterncoin.herokuapp.com";

var Service = {
  post(url, data) {
    if (data) {
      return fetch(baseUrl + url, {
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      }).then(function(response) {
        return response.json();
      });
    }
    return fetch(baseUrl + url).then(function(response) {
      return response.json();
    });
  }
}

export default Service;
