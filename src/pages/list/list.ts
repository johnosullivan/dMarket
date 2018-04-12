import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: string[];
  tempuser:any;

  constructor(public userProvider:UserProvider,public storage:Storage,public web3Provider:Web3Provider,public navCtrl: NavController, public navParams: NavParams) {

    this.items = this.web3Provider.getWeb3().eth.accounts;
    this.tempuser = "0x901473eE8ac77F0967aD3D0Ac2943d4f27668a7f,a3bcb5a37abe81976ac4facdbb36e21db62e811b9c7f7ad0f99950a472583940";
  }

  set() {
    console.log("Set ETH User");
    var web3account = this.web3Provider.getWeb3Account();
    var data = this.tempuser.split(",");
    var temp = { address: data[0],privateKey: data[1] };
    this.storage.set('account', temp);
  }

  update() {
    this.userProvider.user_data = {
      transactions: [],
      listings: []
    };
    this.userProvider.update();
  }

  itemTapped(event, item) {
    console.log("Checking Value: " + item);
    var web3 = this.web3Provider.getWeb3();
    var bal = web3.eth.getBalance(item).c;
    var con = this.web3Provider.getdMarkContract();
    var baldMark = con.balanceOf(item).c;
    var result = "ETH: " + bal[0] / 10000 + " dMT: " + baldMark[0];
    console.log("Result: " + result);
  }

}
