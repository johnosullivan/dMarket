import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Accounts from 'web3-eth-accounts';
import { ConfigProvider } from '../config/config';
import { ABIProvider } from './abi';

@Injectable()
export class Web3Provider {

  web3:any;
  web3accounts:any;
  tokenContract:any;

  dDT:any;
  ether:any;

  paddress:any;
  transWatching:any;

  constructor(public configProvider:ConfigProvider,public abiProvider:ABIProvider) {
    console.log("Creating an instance of the web3.js");

    this.dDT = 0;
    this.ether = 0;
    this.paddress = "";
    this.web3 = new Web3();

    if (typeof this.web3 !== undefined) {
      this.web3accounts = new Web3Accounts(configProvider.ETH_URL);
      this.web3 = new Web3(new Web3.providers.HttpProvider(configProvider.ETH_URL));
    } else {

    }
  }

  setUser(address) {
    if (this.transWatching !== undefined) { this.stopWatching(); }
    this.web3.eth.defaultAccount = address;
    this.paddress = address;
    var contract = this.web3.eth.contract(this.abiProvider.TOKEN_ABI);
    this.tokenContract = contract.at(this.configProvider.dMARK_Address);
    var transferEvent = this.tokenContract.Transfer();
    var self = this;
    this.transWatching = transferEvent.watch(function(error, result){
        if (!error) {
          if (self.paddress !== undefined) {
            var transactionArg = result.args;
            var publicAddress = self.paddress.toLowerCase();
            var from = transactionArg.from.toLowerCase();
            var to = transactionArg.to.toLowerCase();
            console.log("transactionArg: ",transactionArg);
            if ((publicAddress === from) || (publicAddress === to)) {
              self.checkBalance();
            }
          }
        }
    });
    this.checkBalance();
    /*var filter = this.web3.eth.filter('latest');
    this.transWatching = filter.watch(function(error, result) {
      if (self.paddress !== undefined) {
        var block = self.web3.eth.getBlock(result, true);
        var transactionArg = block.transactions[0];
        var publicAddress = self.paddress.toLowerCase();
        var from = transactionArg.from.toLowerCase();
        var to = transactionArg.to.toLowerCase();
        if ((publicAddress === from) || (publicAddress === to)) {
          console.log("ch");
          self.checkBalance();
        }
        console.log(publicAddress);
        console.log(from);
        console.log(to);
        console.log(block);
      }
    });*/
  }

  checkBalance() {
    console.log("Check Balance");
    var balance = this.web3.eth.getBalance(this.paddress).c;
    var contract = this.getdMarkContract();
    var baldMark = contract.balanceOf(this.paddress).c;
    this.ether = balance[0] / 10000;
    this.dDT = baldMark[0];
  }

  stopWatching() { this.transWatching.stopWatching(); }
  getWeb3() { return this.web3; }
  getWeb3Account() { return this.web3accounts; }
  getdMarkContract() { return this.tokenContract; }

}
