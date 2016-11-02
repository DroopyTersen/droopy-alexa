var iot = require("droopy-iot").register("alexa");
var confirmations = require("../confirmations");

var intent = {
    name: "TogglePower",
    slots: {
        //FOOD_TYPES will need to be configured as a custom slot type
        "DEVICE": "DEVICES",
        "STATE": "STATES"
    },
    utterances: [
        "{turn|power} {-|STATE} {the |} {-|DEVICE}",
    ]
};


intent.handler = function(request, response) {
    var state = request.slot("STATE") || "on";
    state = state === "off" ? false : true;

    var devices = {
        "corner light": "four",
        "fish tank": "three"
    };
    var outlet = devices[request.slot("DEVICE")]
    if (outlet) {
        iot.trigger("toggle-power", { outlet, state }, "horace").then(() => {
            response.say(confirmations.getOne()).send();
        })
    }

    return false;
};


module.exports = intent;