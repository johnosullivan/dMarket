const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

//const input = fs.readFileSync('Token.sol');
//const output = solc.compile(input.toString(), 1);

//const bytecode = output.contracts[':SampleCrowdsale'].bytecode;
//const abi = JSON.parse(output.contracts[':SampleCrowdsale'].interface);

var privateKey = new Buffer('ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f', 'hex');
var publicKey = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

web3.eth.defaultAccount = publicKey;

const abi = [{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"buyFor","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"availableBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"name":"_value","type":"uint256"},{"name":"","type":"bytes"}],"name":"tokenFallback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token","type":"address"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"},{"name":"price","type":"uint256"},{"name":"limit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beneficiary","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Buy","type":"event"}];

const contract = web3.eth.contract(abi);

var myContractInstance = contract.at("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf");
const contractData = myContractInstance.buy.getData({from: publicKey, value: web3.toWei(1, 'ether')});

const gasPrice = web3.eth.gasPrice;
const gasPriceHex = web3.toHex(gasPrice);
const gasLimitHex = web3.toHex(3000000);

const nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount);
const nonceHex = web3.toHex(nonce);

const rawTx = {
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    data: contractData
};

const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();

function waitForTransactionReceipt(hash) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(hash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(hash);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        //testContract(receipt.contractAddress);
    }
}

web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }

    // Log the tx, you can explore status manually with eth.getTransaction()
    console.log('contract creation tx: ' + hash);

    // Wait for the transaction to be mined
    waitForTransactionReceipt(hash);
});
