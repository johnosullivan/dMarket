import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance:string;
  user:any;
  tempuser:any;

  constructor(
    public userProvider:UserProvider,
    private touchId: TouchID,
    private storage: Storage,
    public navCtrl: NavController,
    public web3Provider:Web3Provider
  ) {
    this.balance = "";
    this.tempuser = "";
  }

  ionViewWillLeave() {

  }

  transHistory() {
    var allhashes = this.userProvider.user_data['transactions'];
    var transactions = this.web3Provider.getTransactions(allhashes);
    console.log("Transaction_History: ", transactions);
  }

  printUser() {
    console.log(this.user);
  }

  getdMarkContract() {
    console.log(this.web3Provider.getdMarkContract());
  }

  authtouch() {
    console.log("Auth Private Key");
  }

  checkBalance() {
    this.web3Provider.checkBalance();
  }
}
