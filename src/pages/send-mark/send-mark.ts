import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ConfigProvider } from '../../providers/config/config';
import { ComfirmSendPage } from '../comfirm-send/comfirm-send';

declare const Buffer
import Tx from 'ethereumjs-tx';
import Units from 'ethereumjs-units';

@IonicPage()
@Component({
  selector: 'page-send-mark',
  templateUrl: 'send-mark.html',providers:[BarcodeScanner]
})
export class SendMarkPage {

  dMark:any;
  toAddress:any;
  gasPrice:any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    public configProvider:ConfigProvider,
    public viewController:ViewController,
    public web3Provider:Web3Provider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.dMark = '';
    this.toAddress = '';
    this.gasPrice = '';
  }

  ionViewDidLoad() { }

  scan() {
    var self = this;
    this.barcodeScanner.scan().then((barcodeData) => {
      self.toAddress = barcodeData.text;
    }, (err) => {
      /* Could not scan the public address QR Code */
    });
  }

  send() {
    let confirm = this.modalCtrl.create(ComfirmSendPage, { dMark: parseInt(this.dMark), toAddress: this.toAddress }, { enableBackdropDismiss: false });
    confirm.onDidDismiss(obj => {
      if (obj.status) {
        this.viewController.dismiss({status:false});
      }
    });
    confirm.present();
  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
