var phrases = [
	"As you wish.",
	"No problem",
	"All set.",
	"That was easy.",
	"Good to go.",
	"Easy Peezy.",
	"Done",
	"Sir Yes Sir",
	"Your wish is my command",
	"Okay",
	"Finished",
	"Got it",
	"Success",
    "Aint No thing but a chicken wing"
];

module.exports = {
    phrases,
    getOne() {
        return phrases[Math.floor(Math.random() * phrases.length)]
    }
}