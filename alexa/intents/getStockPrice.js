var stocksApi = require("../../services/stocksApi");

var intent = {
    name: "GetStockPrice",
    slots: {
        //FOOD_TYPES will need to be configured as a custom slot type
        "COMPANY": "COMPANY_NAMES" 
    },
    utterances: [
        "{what the|} {stock|} price of {-|COMPANY} {is|}",
        "give me the {stock|} price {of|for} {-|COMPANY}",
        "how much {-|COMPANY} is trading {at|for}",
        "what {the|} {-|COMPANY} {stock|} price is",
        "for the {stock|} price of {-|COMPANY}"
    ]
};

intent.handler = function(request, response) {

    stocksApi.search(request.slot('COMPANY'))
        .then(results => handleSuccess(results, response))
        .catch(err => handleError(response, err));

    return false;
};



var handleError = function(response, err) {
    console.log(err);
    response.say("Sorry, I couldn't find the stock you were looking for.").send();
};

var handleSuccess = function(stock, response) {
    var symbol = `<say-as interpret-as="spell-out">${stock.symbol}</say-as>`
    response.say(`${stock.name}, ${symbol}, is trading at $${stock.price}`).send();
}

module.exports = intent;