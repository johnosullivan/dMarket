import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-my-settings',
  templateUrl: 'my-settings.html',
})
export class MySettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider:UserProvider
  ) {
  }

  ionViewDidLoad() {

  }

  address() {
      this.userProvider.setAddresses();
  }

}
