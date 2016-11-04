var request = require("request-promise-native");

var filterSymbolResults = function(results) {
    return results.filter(r => {
        var exchanges = [ "NYS", "NAS", "ASE", "NYQ"];
        return r.typeDisp === "Equity" && (exchanges.indexOf(r.exch) > -1)
    });
};

var getPrice = exports.getPrice = function(symbol) {
    var url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D${symbol}%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json`
    return request.get({url, json:true}).then(json => {
        return json.query.results.row
    });
};

exports.search = function(company) {
    console.log(company);
    return findSymbol(company).then(stock => {
        if (stock === null) throw new Error(`Unable to find stock symbol for '${company}'`);
        return getPrice(stock.symbol).then(result => Object.assign({}, stock, result));
    });
};

var findSymbol = exports.findSymbol = function(company) {
    var url = `http://d.yimg.com/aq/autoc?query=${company}&region=US&lang=en-US`;

    return request.get( {url, json:true })
        .then(json => json.ResultSet.Result)
        .then(filterSymbolResults)
        .then(results => results.length ? results[0] : null);
}

