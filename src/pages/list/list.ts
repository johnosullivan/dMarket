import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: string[];

  constructor(public web3Provider:Web3Provider,public navCtrl: NavController, public navParams: NavParams) {

    this.items = this.web3Provider.getWeb3().eth.accounts;

  }

}
