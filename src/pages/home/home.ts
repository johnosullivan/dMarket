import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import Accounts from 'web3-eth-accounts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;

  constructor(public navCtrl: NavController,public web3Provider:Web3Provider) {

  }

  create() {
    console.log("Creating ETH user");
    var web3account = this.web3Provider.getWeb3Account();

    this.user = web3account.create();

    console.log(this.user);

  }

  checkBalance() {
    console.log("Checking ETH user balance");

    var web3 = this.web3Provider.getWeb3();

    console.log(web3.eth.getBalance("0xFf5AF761bFfdC242F852C0d006D2ef5797b2FF43"));

  }

}
