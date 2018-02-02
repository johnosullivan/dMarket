import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController) {

  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
