var request = require('request-promise-native');

exports.trigger = function(event, payload) {
    var url = `https://maker.ifttt.com/trigger/${event}/with/key/i17-YgMHK72879lfnlnMF3oB3Ky4GzISYJXeCnrkO09`
    return request({ url, method: "POST", json:true, body: payload }).then(() => "success");
}