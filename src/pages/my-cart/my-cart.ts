import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  items:any;
  total:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController:ViewController,
    public cartProvider:CartProvider
  ) {
    this.items = cartProvider.mycart;
    this.total = 0;

    for (var i = 0; i < this.items.length; i++) {
      this.total += (parseInt(this.items[i].product['price']) * this.items[i].quantity);
    }
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

  getImage(item) {
    if (item['images'].length !== 0) {
      return item['images'][0];
    }
    return "http://clipground.com/images/picture-not-available-clipart-12.jpg";
  }

}
