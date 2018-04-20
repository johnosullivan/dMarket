import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController) {
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewController.dismiss({ status: false });
  }

}
