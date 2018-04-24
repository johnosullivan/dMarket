const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var prompt = require('prompt');

prompt.start();

var schema = {
  properties: {
    contractPath: { required: true },
    contractName: { required: true },
    web3URI: { required: true },
    publicKey: { required: true },
    privateKey: { required: true }
  }
};

prompt.get(schema, function (err, result) {
  // Gets the public key
  const pubKey = result.publicKey;
  // Gets the private key
  const priKey = result.privateKey;
  // Gets the connnection
  const web3URI = result.web3URI;
  // Gets contractPath from prompt to build
  const contractPath = result.contractPath;
  // Gets the contractName from the prompt to build
  const contractName = result.contractName;
  // Begins deployment
  console.log("solc: Compiling -> " + contractPath);
  const input = fs.readFileSync(contractPath);
  const output = solc.compile(input.toString(), 1);
  const bytecode = output.contracts[':' + contractName].bytecode;
  const abi = JSON.parse(output.contracts[':' + contractName].interface);
  // Starting deployment
  var web3 = new Web3(web3URI);
  web3.eth.defaultAccount = pubKey;
  // Gets nonce count
  web3.eth.getTransactionCount(web3.eth.defaultAccount).then((nonce) => {
    web3.eth.getGasPrice().then((gasPrice) => {
      const gasPriceHex = web3.utils.toHex(gasPrice);
      const gasLimitHex = web3.utils.toHex(3000000);
      var contract = new web3.eth.Contract(abi, { from: pubKey, gasPrice: '20000000000' });
      let deploy = contract.deploy({ data: '0x' + bytecode }).encodeABI();
      const rawTx = {
        "from": pubKey,
        "nonce": "0x" + nonce.toString(16),
        "gasPrice": gasPriceHex,
        "gasLimit": gasLimitHex,
        "data": deploy
      };
      var privateKey = new Buffer(priKey, 'hex')
      var tx = new Tx(rawTx);
      tx.sign(privateKey);
      var serializedTx = tx.serialize();
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);

      });
   });
});
