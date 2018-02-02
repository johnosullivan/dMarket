import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';
import { UserProvider } from '../../providers/user/user';
import { WindowRef } from '../../app/window';
import { Platform } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';

import ipfsAPI from 'ipfs-api';
declare const Buffer;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance:string;
  user:any;
  tempuser:any;
  ipfs:any;

  constructor(
    public userProvider:UserProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public web3Provider:Web3Provider,
    public windowRef:WindowRef,
    public plt:Platform,
    public modalCtrl:ModalController
  ) {
    this.balance = "";
    this.tempuser = "";
    this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
  }

  ionViewWillLeave() {

  }

  add() {
    let addModal = this.modalCtrl.create(AddProductPage, { }, { enableBackdropDismiss: false });
    addModal.present();
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfs.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
      }).catch((err) => {
        console.error(err)
      })
    }

  uploadFile(event) {
    let files = event.target.files;
    console.log(files);
    console.log(this.plt.is('core'));
    /*if (files.length > 0) {
      console.log(files);
      const file = files[0]
      let reader = new this.windowRef.nativeWindow.FileReader()
      reader.onloadend = () => this.saveToIpfs(reader)
      reader.readAsArrayBuffer(file)
    }*/
  }

  transHistory() {
    var allhashes = this.userProvider.user_data['transactions'];
    var transactions = this.web3Provider.getTransactions(allhashes);
    console.log("Transaction_History: ", transactions);
  }

  printUser() {
    console.log(this.user);
  }

  getdMarkContract() {
    console.log(this.web3Provider.getdMarkContract());
  }

  authtouch() {
    console.log("Auth Private Key");
  }

  checkBalance() {
    this.web3Provider.checkBalance();
  }
}
