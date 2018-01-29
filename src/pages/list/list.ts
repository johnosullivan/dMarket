import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: string[];
  tempuser:any;

  constructor(public storage:Storage,public web3Provider:Web3Provider,public navCtrl: NavController, public navParams: NavParams) {

    this.items = this.web3Provider.getWeb3().eth.accounts;
    this.tempuser = "0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2,388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418";
  }

  set() {
    console.log("Set ETH User");
    var web3account = this.web3Provider.getWeb3Account();
    var data = this.tempuser.split(",");
    var temp = { address: data[0],privateKey: data[1] };
    this.storage.set('account', temp);
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
