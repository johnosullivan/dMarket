import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';

import Accounts from 'web3-eth-accounts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TouchID]
})
export class HomePage {

  balance:string;
  user:any;

  constructor(private touchId: TouchID,private storage: Storage,public navCtrl: NavController,public web3Provider:Web3Provider) {
    this.balance = "ETH: 0 dMT: 0";
    this.storage.get('account').then((val) => { this.user = val; });
    this.touchId.isAvailable().then(
      res => console.log('TouchID is available!'),
      err => console.error('TouchID is not available', err)
    );
  }

  create() {
    console.log("Creating ETH user");
    var web3account = this.web3Provider.getWeb3Account();
    this.user = web3account.create();
    this.storage.set('account', this.user);
  }

  printUser() {
    console.log(this.user);
  }

  getdMarkContract() {
    console.log(this.web3Provider.getdMarkContract());
  }

  authtouch() {
    console.log("Auth Private Key");
    this.touchId.verifyFingerprint('Scan your fingerprint please').then(
      res => console.log('Ok', res),
      err => console.error('Error', err)
    );
  }

  checkBalance() {
    console.log("Checking ETH user balance");
    var web3 = this.web3Provider.getWeb3();
    var bal = web3.eth.getBalance(this.user.address).c;
    console.log(bal);
    var con = this.web3Provider.getdMarkContract();
    var baldMark = con.balanceOf(this.user.address).c;
    console.log(baldMark);
    this.balance = "ETH: " + bal[0] / 10000 + " dMT: " + baldMark[0]
  }

  transfer() {
    console.log("Transfering");
    var web3 = this.web3Provider.getWeb3();
    var sender = web3.eth.accounts[0];
    var receiver = this.user.address;
    var amount = web3.toWei(1.01, "ether")
    var hash = web3.eth.sendTransaction({from:sender, to:receiver, value: amount});
    console.log("Transaction Hash: " + hash);
  }

}
