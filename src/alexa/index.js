// https://github.com/matt-kruse/alexa-app
var AlexaSkill = require("alexa-app").app;

// Create a new skill and register all of our intents
var skill = new AlexaSkill("o365");
require("./intents").setup(skill);

module.exports = skill;