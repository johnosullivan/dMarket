import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CartProvider } from '../../providers/cart/cart';
import { MyCartPage } from '../my-cart/my-cart';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  sliderOptions = { pager: true, autoHeight: true }

  @ViewChild(Slides) slides: Slides;

  item:any;
  count:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public cartProvider: CartProvider
  ) {
    //this.slides.autoHeight = false;
    //navParams.get('item')
    this.item = navParams.get('item');
    this.count = 1;
    //this.item = {"name":"iPad - Apple","description":"No matter the task, the new iPad Pro is up to it — and then some. It offers far more power than most PC laptops, yet is delightfully simple to use. The redesigned Retina display is as stunning to look at as it is to touch. And it all comes together with iOS, the world’s most advanced mobile operating system. iPad Pro. Everything you want modern computing to be. Now even, well, better.","price":"300","images":["http://127.0.0.1:8080/ipfs/QmRACG9rUu6Gsvx2YMHeoG54xzmK4BxTEW2uBwQZVfN95u","http://127.0.0.1:8080/ipfs/QmXXG8NvWEpz5NxmzKwhndEPwJYjJBVgqkHh6BGPFFGcci","http://127.0.0.1:8080/ipfs/QmeLBswifk1x8Dwgja3otyWhFxnnowjRTBwYXXRuD6pj4L"]};
  }

  ionViewDidLoad() {

  }

  getImage(item) {
    if (item['images'].length !== 0) {
      return item['images'][0];
    }
    return "http://clipground.com/images/picture-not-available-clipart-12.jpg";
  }

  addCart() {
    this.cartProvider.add({"quantity":this.count,"product":this.item});
  }

  cart() {
    let cartModal = this.modalCtrl.create(MyCartPage, { }, { enableBackdropDismiss: false });
    cartModal.present();
  }

}
