var makerService = require("../../services/makerService");

var intent = {
    name: "SendText",
    slots: {
        //FOOD_TYPES will need to be configured as a custom slot type
        "CONTACT": "CONTACTS",
        "MESSAGE": "TEXT_MESSAGES"
    },
    utterances: [
        "send a text {message|} to {-|CONTACT}",
        "text {-|CONTACT} {with the message|} {-|MESSAGE}",
        "the message {is|equals} {-|MESSAGE}"
    ]
};

var contacts = {
    "Natalie": "2623085576",
    "Mom": "2629392598",
    "Dad": "2629392018",
    "Hannah": "2629890412",
    "Brad Schlintz": "9205851307",
    "Me": "2629301118",
    "Myself": "2629301118"
};

var findNumber = function(name) {
    var match = null;
    if (!name) return name;
    Object.keys(contacts).forEach(c => {
        if (c.toLowerCase() === name.toLowerCase()) match = contacts[c];
    })

    return match;
}
intent.handler = function(request, response) {
    var number = findNumber(request.slot("CONTACT")) || response.session("phone-number");

    if (number) {
        response.session("phone-number", number);
        var message = request.slot("MESSAGE");
        if (!message) {
            response.shouldEndSession(false, "What is the message?").send();
        } else {
            var payload = { value1: number, value2: message };
            makerService.trigger("send_text", payload).then(() => handleSuccess(payload, response));
        }
    } else {
        handleError(response)
    }
    return false;
};



var handleError = function(response, err) {
    console.log(err);
    response.say("Sorry, I couldn't find the contact you were looking for.").send();
};

var handleSuccess = function(payload, response) {
    var msg = `Done. Sent to <say-as interpret-as="digits">${payload.value1}</say-as>`
    response.say(msg).send();
}

module.exports = intent;