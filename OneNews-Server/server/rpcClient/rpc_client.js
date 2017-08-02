var jayson = require('jayson');

var client = jayson.client.http({
  port: 4041,
  hostname: 'localhost'
});


// Test method
function add(a, b, callback) {
  client.request('add', [a, b], function(err, error, response) {
    if (err) throw err;
    console.log(response);
    callback(response);
  });
}

function fetchNews(number, pagenumber, callback) {
  client.request('fetch', [number, pagenumber], function(err, error, response) {
    if (err) throw err;
    //console.log(response);
    callback(response);
  });

}

module.exports = {
  add: add,
  fetchNews: fetchNews
}
