/*
  These endpoints are only available during local development
  this way we can test out our services without actually 
  making them publically accessbile when we deploy to azure
*/
var stocksApi = require("../services/stocksDemo");

exports.configure = function(app) {

    app.get("/stocks/:company", (req, res) => {
        respondAsync(stocksApi.search(req.params.company), res);
    })
};


// Helper function to wrap all promise requests in a catch to output the error message
var respondAsync = function(promise, res) {
    promise
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.send(err.message);
        })
};