var nutritionApi = require("../../services/nutritionApi");

var intent = {
    name: "CalorieCount",
    slots: {
        //FOOD_TYPES will need to be configured as a custom slot type
        "FOOD": "FOOD_TYPES" 
    },
    utterances: [
        "how many calories {does|do} {-|FOOD} have",
        "how many calories {are there|are|} in {-|FOOD}",
        "how many calories {-|FOOD} {has|have}"
    ]
};

intent.handler = function(request, response) {
    // Get the food that was searched for
    var foodSearch = request.slot('FOOD');

    // hit the nutrition api
    nutritionApi.search(foodSearch)
        .then(results => handleSuccess(results, response))
        .catch(err => handleError(response));
    // Return false to represent an async intent handler
    return false;
};

var handleError = function(response) {
    response.say("Sorry, I couldn't find the food you were looking for.").send();
};

var handleSuccess = function(results, response) {
    if (!results || !results.length) handleError(response);
    else {
        var msg = `There are ${results[0].calories} calories in ${results[0].brand} ${results[0].name}`;
        response.say(msg).send();
    }
};

module.exports = intent;