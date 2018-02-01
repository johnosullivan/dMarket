import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Web3Provider } from '../providers/web3/web3';
import { AddUserPage } from '../pages/add-user/add-user';
import { SendMarkPage } from '../pages/send-mark/send-mark';
import { UserProvider } from '../providers/user/user';
import { ListingPage } from '../pages/listing/listing';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user:any;
  qr = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    public userProvider:UserProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public storage:Storage,
    public web3Provider:Web3Provider,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Listings', component: ListingPage },
      { title: 'Transaction History', component: HomePage }
    ];

    this.storage.get('account').then((account) => {
      this.user = account;
      this.web3Provider.setUser(this.user.address);
      this.web3Provider.setPrivateDebug(this.user.privateKey);
      this.qr = this.user.address;
      console.log("Account: ", this.user);
    });

    var self = this;
    this.storage.get('ipfs').then((ipfs) => {
      console.log("IPFS Hash: ", ipfs);
      if (ipfs == null) {
        self.userProvider.newProfile();
      } else {
        self.userProvider.getProfile(ipfs);
      }
    });

    events.subscribe('user:new', (user, time) => {
      console.log('Public', user, 'at', time);
      let profileModal = this.modalCtrl.create(AddUserPage, { publicKey: user });
      profileModal.present();
    });

  }

  sendMark() {
    let profileModal = this.modalCtrl.create(SendMarkPage, { }, { enableBackdropDismiss: false });
    profileModal.present();
  }

  accounts() {
    this.nav.setRoot(ListPage);
  }

  ionViewWillEnter() {  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
