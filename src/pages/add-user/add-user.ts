import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  user:any;
  publicKey:any;

  constructor(public web3Provider:Web3Provider,public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.user = {"firstName":"","lastName":"","email":""}
    this.publicKey = navParams.get("publicKey");
  }

  save() {
    console.log(this.user);
    this.web3Provider.insertUser(this.publicKey, this.user);
    this.viewController.dismiss({status:false});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');

  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
