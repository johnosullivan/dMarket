const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

console.log("Building Soldity Contract...");

const configs = fs.readFileSync('contract_list.json').toString();
const list = JSON.parse(configs);
console.log(list);


/*
const input_dmt = fs.readFileSync('contracts/dMT.sol');
const output_dmt = solc.compile(input_dmt.toString(), 1);
const bytecode_dmt = output_dmt.contracts[':dMark'].bytecode;
const abi_dmt = JSON.parse(output_dmt.contracts[':dMark'].interface);

const input_order = fs.readFileSync('contracts/dMTOrders.sol');
const output_order = solc.compile(input_order.toString(), 1);
const bytecode_order = output_order.contracts[':OrderManager'].bytecode;
const abi_order = JSON.parse(output_order.contracts[':OrderManager'].interface);

console.log("Connecting to ethereum...");

var privateKey = "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
var publicKey = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

var blockchainuri = "http://localhost:8545";
var initCoinAmount = 100000000000000;
var buyPrice  = 1000000000000000;
var sellPrice = 1000000000000000;

const provider = new Web3.providers.HttpProvider(blockchainuri);
const web3 = new Web3(provider);
web3.eth.defaultAccount = publicKey;

console.log("Creating Transaction Data...");
const contract_dmt = web3.eth.contract(abi_dmt);
const contractData_dmt = contract_dmt.new.getData(initCoinAmount, { data:'0x' + bytecode_dmt });
const gasPrice_dmt = web3.eth.gasPrice;
const gasPriceHex_dmt = web3.toHex(gasPrice_dmt);
const gasLimitHex_dmt = web3.toHex(3000000);
const nonce_dmt = web3.eth.getTransactionCount(web3.eth.defaultAccount);
const nonceHex_dmt = web3.toHex(nonce_dmt);
const rawTx_dmt = {
  nonce: nonceHex_dmt, gasPrice: gasPriceHex_dmt,
  gasLimit: gasLimitHex_dmt, data: contractData_dmt
};


function setTransactionData_DMT(hash_token) {
  console.log("Token_Address_DMT: ", hash_token);
  const contract_order = web3.eth.contract(abi_order);
  const contractData_order = contract_order.new.getData({ data:'0x' + bytecode_order });
  const gasPrice_order = web3.eth.gasPrice;
  const gasPriceHex_order = web3.toHex(gasPrice_order);
  const gasLimitHex_order = web3.toHex(3000000);
  const nonce_order = web3.eth.getTransactionCount(web3.eth.defaultAccount);
  const nonceHex_order = web3.toHex(nonce_order);
  const rawTx_order = {
    nonce: nonceHex_order, gasPrice: gasPriceHex_order,
    gasLimit: gasLimitHex_order, data: contractData_order
  };

  const tx_order = new Tx(rawTx_order);
  tx_order.sign(privateBuffer);
  const serializedTx_order = tx_order.serialize();

  web3.eth.sendRawTransaction(serializedTx_order.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    console.log('Contract ORDER Creation TX: ' + hash);
    waitForTransactionReceiptORDER(hash);
  });
}

function setTransactionData_ORDER(hash_token) {
  console.log("Token_Address_ORDER: ", hash_token);
}

console.log("Signing Contract...");
var privateBuffer = new Buffer(privateKey, 'hex');

const tx_dmt = new Tx(rawTx_dmt);
tx_dmt.sign(privateBuffer);
const serializedTx_dmt = tx_dmt.serialize();

function waitForTransactionReceiptDMT(hash) {
  const receipt = web3.eth.getTransactionReceipt(hash);
  if (receipt == null) { setTimeout(() => { waitForTransactionReceiptDMT(hash); }, 1000);
} else { setTransactionData_DMT(receipt.contractAddress); }
}

function waitForTransactionReceiptORDER(hash) {
  const receipt = web3.eth.getTransactionReceipt(hash);
  if (receipt == null) { setTimeout(() => { waitForTransactionReceiptORDER(hash); }, 1000);
} else { setTransactionData_ORDER(receipt.contractAddress); }
}

web3.eth.sendRawTransaction(serializedTx_dmt.toString('hex'), (err, hash) => {
  if (err) { console.log(err); return; }
  console.log('Contract DMT Creation TX: ' + hash);
  waitForTransactionReceiptDMT(hash);
});
*/
