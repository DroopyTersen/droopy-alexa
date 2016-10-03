var bodyParser = require("body-parser");
var express = require("express");
var alexaSkill = require("./alexa");
var nutritionApi = require("./services/nutritionApi");
var config = { port: process.env.PORT || 3000 };

var app = express();

// we need the body parser so we can get at the POST body that Amazon sends
app.use(bodyParser.json());

// Endpoint to configure your Alexa Skill with
app.post("/alexa", function(req, res) {
    // Pass the POST body to the alexa skill
    promiseResponse(alexaSkill.request(req.body), res);
})

// Endpoint to test API service
app.get("/nutrition/:search", function(req, res){
    promiseResponse(nutritionApi.search(req.params.search), res);
});


// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});


// Helper function to wrap all promise requests in a catch to output the error message
var promiseResponse = function(promise, res) {
    promise.then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.send(err.message);
        })
};