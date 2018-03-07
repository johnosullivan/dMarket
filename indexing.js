const fs = require('fs');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require("http");
var mongoose = require('mongoose');
var cors = require('cors');

const privateKey = new Buffer('c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3', 'hex')
const publicKey = "0xfa5b6432308d45b54a1ce1373513fab77166436f";
const web3url = "http://localhost:8545";
const ipfsbase = "http://127.0.0.1:8080/ipfs/";
const mongoDB = 'mongodb://127.0.0.1/ipfs_index';

const contract_address = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";
const orders_address = "0xf12b5dd4ead5f743c6baa640b0216200e89b60da";

const abi =  [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"hashes","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"removeItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"listItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"paddress","type":"address"},{"indexed":false,"name":"ipfshash","type":"string"}],"name":"AddedListing","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"paddress","type":"address"},{"indexed":false,"name":"ipfshash","type":"string"}],"name":"DeactiveListing","type":"event"}];

const orders_abi = [{"constant":false,"inputs":[{"name":"_shippingaddress","type":"string"},{"name":"_ordersize","type":"uint256"},{"name":"_cost","type":"uint256[]"},{"name":"_quantity","type":"uint256[]"},{"name":"_addresses","type":"address[]"},{"name":"_productIDs","type":"string"}],"name":"createOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"order","type":"address"},{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"sellers","type":"address[]"}],"name":"CreateOrder","type":"event"}];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var server = http.createServer(app);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error!'));

const provider = new Web3.providers.HttpProvider(web3url)
const web3 = new Web3(provider)
web3.eth.defaultAccount = publicKey;

var ListSchema = new mongoose.Schema({
   name: String,
   hash: String,
   address: String,
   created: Date,
   updated: Date
});

ListSchema.index({ name: 'text'});
var ListModel = mongoose.model('Listing', ListSchema);

var OrderSchema = new mongoose.Schema({
   transactionHash: String,
   sellers: Array,
   buyer: String,
   order: String,
   created: Date,
   updated: Date
});

var OrderModel = mongoose.model('Orders', OrderSchema);

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



var listContract = web3.eth.contract(abi);
const contract = listContract.at(contract_address);

var addEvent = contract.AddedListing();
addEvent.watch(function(error, result){
  console.log("Indexing Item");
  const hash = result['args'].ipfshash;
  const paddress = result['args'].paddress;
  ListModel.find({'hash':hash}).exec(function(err, results) {
    if (results.length === 0) {
      var client = new HttpClient();
      client.get(ipfsbase + hash, function(response) {
        var item = JSON.parse(response);
        var listItem = new ListModel({ name: item.name, hash: hash, address: paddress, created: new Date(), updated: new Date() });
        listItem.save(function (err) {
          if (err) return console.log(err);
          console.log(listItem);
        });

      });
    }
  });
});

var deEvent = contract.DeactiveListing();
deEvent.watch(function(error, result){
    console.log(JSON.stringify(result));
});



var orderContract = web3.eth.contract(orders_abi);
const orders = orderContract.at(orders_address);

var new_order = orders.CreateOrder()

new_order.watch(function(error, ev){
   var order = ev;
   var orderDoc = new OrderModel({
     transactionHash: order.transactionHash,
     sellers: order["args"].sellers,
     buyer: order["args"].buyer,
     order: order["args"].order,
     created: new Date(),
     updated: new Date()
   });
   orderDoc.save(function (err) {
     if (err) return console.log(err);
     console.log(orderDoc);
   });
});

var router = express.Router();

router.get('/search/:query', function(req, res){
  //console.log("Search: " + req.params.query);
  var regexQuery = {
    name: new RegExp(req.params.query, 'i')
  }
  ListModel.find(regexQuery).exec(function(err, results) {
    res.json(results);
  });
});

router.get('/order/:pubadress', function(req, res){
  var regexQuery = {
    buyer: req.params.pubadress
  }
  OrderModel.find(regexQuery).exec(function(err, results) {
    res.json(results);
  });
});

app.use('/api', router);

server.listen(process.env.PORT || 3000, function() {
    console.log('Server listening on port: ', 3000);
});
