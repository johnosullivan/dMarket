import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';

import Accounts from 'web3-eth-accounts';

import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TouchID]
})
export class HomePage {

  balance:string;
  user:any;
  tempuser:any;
  transWatching:any;

  constructor(public userProvider:UserProvider,private touchId: TouchID,private storage: Storage,public navCtrl: NavController,public web3Provider:Web3Provider) {

    this.balance = "";
    this.tempuser = "";

  }

  ionViewWillLeave() {

  }

  update() {
    this.userProvider.user_data = {
      "publicKey":this.web3Provider.paddress,
      "firstName":"John",
      "lastName":"O'Sullivan",
      "listings": []
    };
    this.userProvider.update();
  }

  set() {
    console.log("Set ETH User");
    var web3account = this.web3Provider.getWeb3Account();
    var data = this.tempuser.split(",");
    var temp = { address: data[0],privateKey: data[1] };
    this.user = temp;
    this.web3Provider.setUser(this.user.address);
    this.storage.set('account', temp);
  }

  sendDMT() {
    var publicAddress = this.user.address.toLowerCase();
    var web3 = this.web3Provider.getWeb3();
    var con = this.web3Provider.getdMarkContract();
    con.transfer(web3.eth.accounts[5],13430);
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
    this.web3Provider.checkBalance();
  }

  transfer() {
    console.log("Transfering");
    var web3 = this.web3Provider.getWeb3();
    var sender = web3.eth.accounts[5];
    var receiver = this.user.address;
    var amount = web3.toWei(0.10, "ether")
    var hash = web3.eth.sendTransaction({from:receiver, to:sender, value: amount});
    console.log("Transaction Hash: " + hash);
  }

}
