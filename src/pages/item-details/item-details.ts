import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  item:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartProvider: CartProvider
  ) {
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {

  }

  addCart() {
    this.cartProvider.add(this.item);
  }

}
