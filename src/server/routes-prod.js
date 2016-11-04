var alexaSkill = require("../alexa");
exports.configure = function(app) {
    app.get("/", (req, res) => res.send("Hiya"));
    
    // Primary POST endpoint to configure your Alexa Skill with
    app.post("/alexa", function(req, res) {
        // Pass the POST body to the alexa skill
        alexaSkill.request(req.body)
            .then(result => res.send(result))
            .catch(err => {
                console.log(err);
                res.send(err.message);
            })
    })

    // Output the schema 
    app.get("/alexa", function(req, res){
        var html = `
        <div>
            <h2>Schema</h2>
            <pre>${alexaSkill.schema()}</pre>
        </div>
        <div>
            <h2>Utterances</h2>
            <pre>${alexaSkill.utterances()}</pre>
        </div>`
        res.send(html);
    });

};
