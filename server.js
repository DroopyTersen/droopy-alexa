var bodyParser = require("body-parser");
var express = require("express");
var alexaSkill = require("./alexa");
var nutritionApi = require("./services/nutritionApi");
var stocksApi = require("./services/stocksApi");
var config = { port: process.env.PORT || 3000 };

var app = express();

// we need the body parser so we can get at the POST body that Amazon sends
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hiya"));

// Primary POST endpoint to configure your Alexa Skill with
app.post("/alexa", function(req, res) {
    // Pass the POST body to the alexa skill
    respondAsync(alexaSkill.request(req.body), res);
})

// Output the schema 
app.get("/alexa/schema", function(req, res){
    var html = `<pre>${alexaSkill.schema()}</pre>`
    res.send(html);
})
app.get("/alexa/utterances", function(req, res){
    var html = `<pre>${alexaSkill.utterances()}</pre>`
    res.send(html);
})


// Endpoint to test API service
app.get("/nutrition/:search", function(req, res){
    respondAsync(nutritionApi.search(req.params.search), res);
});

app.get("/stocks/:search", function(req, res){
    respondAsync(stocksApi.search(req.params.search), res);
});
// Start the web server on the specified port
app.listen(config.port, process.env.IP, function() {
    console.log("Server running on port " + config.port)
});


// Helper function to wrap all promise requests in a catch to output the error message
var respondAsync = function(promise, res) {
    promise
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.send(err.message);
        })
};