var intents = {
    getStockPrice: require("./DEMO-getStockPrice")
};


// Iterate through all the intents and register them with the skill
exports.setup = function(skill) {
    Object.keys(intents).map(key => intents[key]).forEach(intent => {
        skill.intent(intent.name, { 
            slots: intent.slots, 
            utterances: intent.utterances 
        }, intent.handler);
    })
};

