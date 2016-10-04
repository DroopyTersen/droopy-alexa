// https://github.com/matt-kruse/alexa-app
var AlexaSkill = require("alexa-app").app;

// Create a new skill and register all of our intents
var skill = new AlexaSkill("demo");
require("./intents").setup(skill);

// Output the Intent Schema and Utterances for easy pasting into the Amazon Skill Configuration
// https://developer.amazon.com/edw/home.html#/skills/list
console.log("=== INTENT SCHEMA ===")
console.log(skill.schema());
console.log("\n=== UTTERANCES ===")
console.log(skill.utterances());

module.exports = skill;