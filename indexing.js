const fs = require('fs');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/ipfs_index';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!'));

const privateKey = new Buffer('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', 'hex')
const publicKey = "0xfa5b6432308d45b54a1ce1373513fab77166436f";
const web3url = "http://localhost:8545";
const ipfsbase = "http://127.0.0.1:8080/ipfs/";

const abi = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"hashes","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"removeItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"listItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"paddress","type":"address"},{"indexed":false,"name":"ipfshash","type":"string"}],"name":"AddedListing","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"paddress","type":"address"},{"indexed":false,"name":"ipfshash","type":"string"}],"name":"DeactiveListing","type":"event"}];

const contract_address = "";

const provider = new Web3.providers.HttpProvider(web3url)
const web3 = new Web3(provider)
web3.eth.defaultAccount = publicKey;

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    name: String
});

var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

var awesome_instance = new SomeModel({ name: 'awesome' });

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return console.log(err);
  // saved!
  console.log("Saved");
});


var HttpClient = function() {
    this.get = function(uri, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) { callback(request.responseText); }
        }
        request.open("GET",uri,true);
        request.send(null);
    }
}

var coursetroContract = web3.eth.contract(abi);
const contract = coursetroContract.at(contract_address);

var addEvent = contract.AddedListing();
addEvent.watch(function(error, result){
  console.log("Indexing Item");
  console.log(JSON.stringify(result));
  const hash = result['args'].ipfshash;
  var client = new HttpClient();
  client.get(ipfsbase + hash, function(response) {
    console.log(response);
  });
});

var deEvent = contract.DeactiveListing();
deEvent.watch(function(error, result){
    console.log(JSON.stringify(result));
});
