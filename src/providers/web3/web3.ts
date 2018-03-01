import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import Web3 from 'web3';
import Web3Accounts from 'web3-eth-accounts';

import { ConfigProvider } from '../config/config';
import { ABIProvider } from './abi';

@Injectable()
export class Web3Provider {

  web3:any;
  web3accounts:any;
  tokenContract:any;
  userContract:any;

  dDT:any;
  ether:any;

  paddress:any;
  privateaddress:any;

  tokenWatching:any;

  firstName:any;
  lastName:any;
  email:any;

  constructor(public events: Events,public configProvider:ConfigProvider,public abiProvider:ABIProvider) {

    this.dDT = 0;
    this.ether = 0;
    this.paddress = "";
    this.web3 = new Web3();

    this.firstName = "";
    this.lastName = "";
    this.email = "";

    if (typeof this.web3 !== undefined) {
      this.web3accounts = new Web3Accounts(configProvider.ETH_URL);
      this.web3 = new Web3(new Web3.providers.HttpProvider(configProvider.ETH_URL));
    } else {

    }
  }

  getTransactions(hash_array) {
    var alltransactions = [];
    for (var i = 0; i < hash_array.length; i++) {
      var block_number = this.web3.eth.getTransaction(hash_array[i])['blockNumber'];
      alltransactions[i] = this.web3.eth.getBlock(block_number);
    }
    return alltransactions;
  }

  setPrivateDebug(val) {
    this.privateaddress = val;
  }

  createOrder(
    address,
    size,
    costs,
    quantities,
    owners,
    pids
  ) {
    var ordercontract = this.web3.eth.contract(this.abiProvider.ORDER_ABI);
    var order = ordercontract.at(this.configProvider.dORDER_Address);
    order.createOrder(
      address,
      size,
      costs,
      quantities,
      owners,
      pids
    ,{ from: this.paddress, gas: "3000000" },function(err, res){
        if (err){
          console.log(err);
        } else{
          console.log(res);
        }
    });
  }

  setUser(address) {
    if (this.tokenWatching !== undefined) { this.stopWatching(); }
    this.web3.eth.defaultAccount = address;
    this.paddress = address;

    var contract = this.web3.eth.contract(this.abiProvider.TOKEN_ABI);
    this.tokenContract = contract.at(this.configProvider.dMARK_Address);

    var transferEvent = this.tokenContract.Transfer();
    var self = this;
    this.tokenWatching = transferEvent.watch(function(error, result){
        if (!error) {
          if (self.paddress !== undefined) {
            var transactionArg = result.args;
            var publicAddress = self.paddress.toLowerCase();
            var from = transactionArg.from.toLowerCase();
            var to = transactionArg.to.toLowerCase();
            console.log("Transaction_Args: ",transactionArg);
            if ((publicAddress === from) || (publicAddress === to)) {
              self.checkBalance();
            }
          }
        }
    });
    this.checkBalance();
  }

  insertUser(publicKey, user) {
    var usercon = this.web3.eth.contract(this.abiProvider.USER_ABI);
    this.userContract = usercon.at(this.configProvider.dUSER_Address);
    var self = this;
    this.userContract.insertUser(publicKey,user.email,user.firstName,user.lastName,{ from: publicKey, gas: "3000000" },function(err, res){
        if (err){
          console.log(err);
        } else{
          console.log(res);
          self.setUser(publicKey);
        }
    });
  }

  // Gets the balance of the current the public in ether and tokens
  checkBalance() {
    var balance = this.web3.eth.getBalance(this.paddress).c;
    var contract = this.getdMarkContract();
    var baldMark = contract.balanceOf(this.paddress).c;
    this.ether = balance[0] / 10000;
    this.dDT = baldMark[0];
  }

  // Stops the filter for watching the token contract from listen for event triggers
  stopWatching() { this.tokenWatching.stopWatching(); }
  // Gets the current instance of web3
  getWeb3() { return this.web3; }
  // Gets the user and token contracts
  getWeb3Account() { return this.web3accounts; }
  getdMarkContract() { return this.tokenContract; }
  //getdUserContract() { return this.userContract; }

}
