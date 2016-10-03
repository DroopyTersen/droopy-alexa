var api = {};
var request = require("request-promise-native");
var baseUrl = "https://api.nutritionix.com/v1_1";

var appId = "417e89ca";
var appKey = "874cf9e6760b5f819aac779ce2540802";

var _getJSON = function(url) {
    url += `&appId=${appId}&appKey=${appKey}`
	return request.get({ url, json: true});
};

var mapResult = function(result) {
    return {
        name: result.fields.item_name,
        brand: result.fields.brand_name,
        calories: result.fields.nf_calories,
        id: result.fields.item_id,
        fat: result.fields.nf_total_fat,
        serving: {
            size: result.fields.nf_serving_size_qty,
            unit: result.fields.nf_serving_size_unit
        }
    };
};

api.search = function(foodSearch) {
    console.log(foodSearch);
    var url = `${baseUrl}/search/${foodSearch}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat`
    return _getJSON(url).then(json => json.hits.map(mapResult) )
}

module.exports = api;
