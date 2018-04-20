import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';
import { TouchID } from '@ionic-native/touch-id';
import { UserProvider } from '../../providers/user/user';
import { WindowRef } from '../../app/window';
import { Platform } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from '../../providers/config/config';
import { IpfsProvider } from '../../providers/ipfs/ipfs';
import { ItemDetailsPage } from '../item-details/item-details';
import { DomSanitizer } from '@angular/platform-browser';
import { CartProvider } from '../../providers/cart/cart';
import { MyCartPage } from '../my-cart/my-cart';

import kjua from 'kjua';

import ipfsAPI from 'ipfs-api';
declare const Buffer;


import { Connect, SimpleSigner } from 'uport-connect'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance:string;
  user:any;
  tempuser:any;
  ipfs:any;

  product:any;
  files:any;
  hash:any;

  search:any;

  items:any;

  account:any;
  isuport:any;
  qr:any;

  constructor(
    public userProvider:UserProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public web3Provider:Web3Provider,
    public windowRef:WindowRef,
    public plt:Platform,
    public modalCtrl:ModalController,
    public configProvider:ConfigProvider,
    public http:HttpClient,
    public ipfsProvider:IpfsProvider,
    public cartProvider:CartProvider,
    public _DomSanitizer: DomSanitizer
  ) {
    this.balance = "";
    this.tempuser = "";
    this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});

    this.product = {};
    this.files = [];
    this.hash = [];

    this.search = '';

    this.items = [];

    this.isuport = false;
    this.account = '';

  }

  ionViewWillLeave() {

  }

  test() {
    /*console.log("Test");

    var window = this.windowRef.nativeWindow;
    var uportconnect = window.uportconnect;

    const uport = new uportconnect.Connect('dMarket', {
      clientId: '2ouAjchR4wKPxxiLqE6AEhYPRF1sADw2uE5',
      network: 'rinkeby',
      signer: uportconnect.SimpleSigner('4704ff3ba69c877aed124c15866d47177e1613efd1061c9bfb938384c9e810e4')
    })

    console.log(window);

    this.isuport = true;

    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      notifcations: true },
      (uri) => {


        this.qr = uri;

      }).then((userProfile) => {

        console.log(userProfile);
        // Do something after they have disclosed credentials
    })
    */

/*

  var window = this.windowRef.nativeWindow;
  var Web3 = window.Web3;
  var web3 = window.web3;

  web3 = new Web3(web3.currentProvider);

    web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
      console.log('This is mainnet')
      break
    case "2":
      console.log('This is the deprecated Morden test network.')
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    case "4":
      console.log('This is the Rinkeby test network.')
      break
    case "42":
      console.log('This is the Kovan test network.')
      break
    default:
      console.log('This is an unknown network.')
  }
});

  console.log(web3.eth.defaultAccount);
*/


  }


  cart() {
    let cartModal = this.modalCtrl.create(MyCartPage, { }, { enableBackdropDismiss: false });
    cartModal.present();
  }

  getList() {
    this.ipfsProvider.getListing("QmV6Ccw4XsSU8o11Ksso8uxsgiutPdBeDJCuqYxQ1xV7qm").then((data) => {
      console.log(data);
      //this.item = data;
    });
  }

  details(item) {
    this.navCtrl.push(ItemDetailsPage, { 'item':item });
  }

  getLink(address) {
    console.log(address);
    return this.configProvider.IPFS_Address + '/ipfs/' + address;
  }

  add() {
    let addModal = this.modalCtrl.create(AddProductPage, { }, { enableBackdropDismiss: false });
    addModal.present();
  }

  searchByKeyword(event) {
    console.log("Searching... ", this.search);
    this.http.get(this.configProvider.Indexer_Address + '/search/' + this.search).subscribe(data => {
      console.log("Raw... ", data);
      this.ipfsProvider.getListing(data).then((items) => {
        console.log("Results: ", items);
        this.items = items;
      });
    });
  }

  getImage(item) {
    if (item['images'].length !== 0) {
      return item['images'][0];
    }
    return "http://clipground.com/images/picture-not-available-clipart-12.jpg";
  }

  onCancel(event) {
    this.search = '';
    this.items = [];
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfs.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        this.hash.push(ipfsId);
        console.log(ipfsId)
      }).catch((err) => {
        console.error(err)
      })
    }

    searchAction() {
      console.log("Searching... ", this.search);
      //var self = this;
      this.http.get(this.configProvider.Indexer_Address + '/search/' + this.search).subscribe(data => {
        console.log("Raw... ", data);
        this.ipfsProvider.getListing(data).then((items) => {
          console.log("Results: ", items);
          console.log(this.items);
        });
      });
    }

  uploadFile(event) {
    this.files = event.target.files;

    for (var i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      console.log(file);
      let reader = new this.windowRef.nativeWindow.FileReader();
      reader.onloadend = () => this.saveToIpfs(reader);
      reader.readAsArrayBuffer(file);
    }

  }

  list() {
    this.product['images'] = this.hash;
    console.log(this.product);
    var data = new Buffer(JSON.stringify(this.product));
    var path = "dMarketlist.json";
    const stream = this.ipfs.files.addReadableStream();
    stream.on('data', function (file) {
      console.log(file);
    });
    stream.write({ path: path, content: data });
    stream.end();
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
