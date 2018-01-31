import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';

import { ConfigProvider } from '../../providers/config/config';
import { ComfirmSendPage } from '../comfirm-send/comfirm-send';

declare const Buffer
import Tx from 'ethereumjs-tx';
import Units from 'ethereumjs-units';

@IonicPage()
@Component({
  selector: 'page-send-mark',
  templateUrl: 'send-mark.html',
})
export class SendMarkPage {

  dMark:any;
  toAddress:any;
  gasPrice:any;

  constructor(public modalCtrl: ModalController,public configProvider:ConfigProvider,public viewController:ViewController,public web3Provider:Web3Provider,public navCtrl: NavController, public navParams: NavParams) {
    this.dMark = '';
    this.toAddress = '';
    this.gasPrice = '';
  }

  ionViewDidLoad() { }

  send() {
    let confirm = this.modalCtrl.create(ComfirmSendPage, { dMark: parseInt(this.dMark), toAddress: this.toAddress }, { enableBackdropDismiss: false });
    confirm.onDidDismiss(obj => {
      if (obj.status) {
        this.viewController.dismiss({status:false});
      }
    });
    confirm.present();

    /*var privateKey = new Buffer(this.web3Provider.privateaddress, 'hex')

    var web3 = this.web3Provider.getWeb3();
    const gasPrice = web3.eth.gasPrice;
    const gasPriceHex = web3.toHex(gasPrice);
    const gasLimitHex = web3.toHex(300000);

    const nonce = web3.eth.getTransactionCount(this.web3Provider.paddress);
    const nonceHex = web3.toHex(nonce);
    console.log(nonceHex);

    var tokenInstance = this.web3Provider.getdMarkContract();

    var callData = tokenInstance.transfer.getData(this.toAddress,parseInt(this.dMark));

    const rawTx = {
        nonce:nonceHex,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: callData,
        to: this.configProvider.dMARK_Address,
        from: web3.eth.defaultAccount
    };

    var result = web3.eth.estimateGas(rawTx);
    console.log(result);
    this.gasPrice = Units.convert(result, 'wei', 'eth') + " ETH";

    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    function waitForTransactionReceipt(hash) {
        console.log('Waiting for contract to be mined...');
        const receipt = web3.eth.getTransactionReceipt(hash);
        if (receipt == null) {
            setTimeout(() => {
                waitForTransactionReceipt(hash);
            }, 1000);
        } else {
            console.log('Contract Address: ', receipt);
        }
    }

    web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
        if (err) { console.log(err); return; }
        console.log('Creation tx: ' + hash);
        waitForTransactionReceipt(hash);
    });*/

  }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

}
