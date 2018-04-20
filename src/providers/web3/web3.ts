import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import Web3 from 'web3';
import Web3Accounts from 'web3-eth-accounts';

import { ConfigProvider } from '../config/config';
import { ABIProvider } from './abi';

import { WindowRef } from '../../app/window';

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

  constructor(public windowRef:WindowRef,public events: Events,public configProvider:ConfigProvider,public abiProvider:ABIProvider) {

    this.dDT = 0;
    this.ether = 0;
    this.paddress = "";
    //this.web3 = new Web3();

    this.firstName = "";
    this.lastName = "";
    this.email = "";

    /*if (typeof this.web3 !== undefined) {
      this.web3accounts = new Web3Accounts(configProvider.ETH_URL);
      this.web3 = new Web3(new Web3.providers.HttpProvider(configProvider.ETH_URL));
    } else {
a3bcb5a37abe81976ac4facdbb36e21db62e811b9c7f7ad0f99950a472583940
    }*/
    //this.web3 = new Web3("ws://localhost:8545");
    //this.web3 = new Web3("https://rinkeby.infura.io/");

    var window = this.windowRef.nativeWindow;
    var Web3 = window["Web3"];
    var web3 = window["web3"];

    this.web3 = new Web3(web3.currentProvider);

    this.paddress = this.web3.eth.defaultAccount;

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
    this.configProvider.log("dMarket -> setUser()","");
    // Resets the watching events
    //if (this.tokenWatching !== undefined) { this.stopWatching(); }
    //this.web3.eth.defaultAccount = address;
    //this.paddress = address;
    // Gets the token contract from the network
    //this.tokenContract = new this.web3.eth.Contract(this.abiProvider.TOKEN_ABI, this.configProvider.dMARK_Address);
    //this.configProvider.log("TokenContract -> ", this.tokenContract);
    // Gets a the current scope to -> self
    /*var self = this;
    this.tokenContract.events.Transfer({ fromBlock: 0 },  function(error, event){ }).on('data', (log) => {
      let { returnValues: { from, to, value }, blockNumber } = log
      if (self.paddress == from) {
        self.checkBalance();
      }
      if (self.paddress == to) {
        self.checkBalance();
      }
    }).on('changed', (log) => { }).on('error', (log) => { })*/
    // Checks the balance
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
    // Gets the ether balance
    /*this.web3.eth.getBalance(this.paddress).then((user_ether) => {
      this.ether = (user_ether / 1000000000000000000).toFixed(4);
    });*/
    var self = this;
    this.web3.eth.getBalance(this.web3.eth.defaultAccount, function(err, balance) {
      if (err === null) {
        console.log(balance.c[0]);
        self.ether = (balance.c[0] / 10000).toFixed(3);
      }
    });


    // Gets the token balance of the public user address
    /*this.getdMarkContract().methods.balanceOf(this.paddress).call({from: this.paddress}).then((user_dmt) => {
      this.dDT = (user_dmt / 1000000000000000000);
    });*/
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
