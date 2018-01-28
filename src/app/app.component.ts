import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Web3Provider } from '../providers/web3/web3';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user:any;
  qr = null;
  pages: Array<{title: string, component: any}>;

  constructor(public storage:Storage,public web3Provider:Web3Provider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Public Keys', component: ListPage }
    ];

    this.storage.get('account').then((val) => {
      this.user = val;
      this.web3Provider.setUser(this.user.address);
      this.qr = this.user.address;
      console.log("Account Set!", this.user);
    });

    //console.log(this.web3Provider.getWeb3().eth.accounts);

  }

  ionViewWillEnter() {  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
