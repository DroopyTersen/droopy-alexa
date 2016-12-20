# Alexa Office 365 Skill


## Useful links
* [VSTS Work Items](https://skyline.visualstudio.com/Skyline-DevCamp-Alexa/_backlogs/board/Backlog%20items)
* [Amazon Custom Skill Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list)
* [Azure Web Service](https://alexa-demo.azurewebsites.net)
* [Amazon - Steps to build a custom Alexa Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill)
* [Amazon - Interaction Model Docs](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference)

## Installation & Setup

### Required Installs
* [Node.js](https://nodejs.org/en/)
* [GIT for Windows](https://git-scm.com/download/win)

### Recommended Installs
* [Visual Studio Code](http://code.visualstudio.com) - Great node.js debugging
* [ngrok](https://www.npmjs.com/package/ngrok) - Temporarily make your local web server publically accessible w/ https
    * Install: `npm install -g ngrok`
    * Usage (host port 3000): `ngrok http 3000`

### Project Setup

#### Get the Code

Open up a terminal and clone the GIT repository
```
git clone https://github.com/DroopyTersen/droopy-alexa my-alexa-skill
```

#### Install the dependencies
Change directories into the cloned project and install the NPM dependencies
```
cd my-alexa-skill
npm install
```

#### Start the Web Service
You can type `npm run start` from the terminal, or hit F5 in VS Code to debug it.

## Web Service Endpoints

* GET [/alexa](http://localhost:3000/alexa) - Output skill schema and utterances
* POST [/alexa](http://localhost:3000/alexa) - The endpoint Amazon Skill will be configured to post to.
* GET [/alexa/tools](http://localhost:3000) - Utterance builder GUI


## Utterance builder
Typing out all the different ways a user might want to trigger an intent can be very tedious.  To help, I've built an Utterance Builder GUI. It can be accessed at `/alexa/tools`.

![Utterance Builder](docs/utterancebuilder.png)
