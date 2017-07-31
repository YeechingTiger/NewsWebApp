var client = require('./rpc_client');

//Invoke add menthod
client.add(1, 2, function(response) {
  console.assert(response == 3);
})
