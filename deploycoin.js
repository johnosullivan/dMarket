const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
console.log("Building Soldity Contract...");
const input = fs.readFileSync('contracts/dMT.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':dMark'].bytecode;
const abi = JSON.parse(output.contracts[':dMark'].interface);
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
const contract = web3.eth.contract(abi);
const contractData = contract.new.getData(initCoinAmount, { data:'0x' + bytecode });
const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(3000000);
const nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount);
const nonceHex = web3.toHex(nonce);
const rawTx = {
  nonce: nonceHex, gasPrice: gasPriceHex,
  gasLimit: gasLimitHex, data: contractData
};

function setTransactionData(hash_token) {
  console.log("Token_Address: ", hash_token);
}

console.log("Signing Contract...");
const tx = new Tx(rawTx);
var privateBuffer = new Buffer(privateKey, 'hex');
tx.sign(privateBuffer);
const serializedTx = tx.serialize();

function waitForTransactionReceipt(hash) {
  const receipt = web3.eth.getTransactionReceipt(hash);
  if (receipt == null) { setTimeout(() => { waitForTransactionReceipt(hash); }, 1000);
} else { setTransactionData(receipt.contractAddress); }
}
web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
  if (err) { console.log(err); return; }
  console.log('Contract Creation TX: ' + hash);
  waitForTransactionReceipt(hash);
});
