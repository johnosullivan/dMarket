import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { MyCartPage } from '../my-cart/my-cart';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartProvider:CartProvider,
    public modalCtrl:ModalController
  ) {
  }

  ionViewDidLoad() {

  }

  cart() {
    let cartModal = this.modalCtrl.create(MyCartPage, { }, { enableBackdropDismiss: false });
    cartModal.present();
  }

}
