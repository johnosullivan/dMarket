import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Web3Provider } from '../../providers/web3/web3';
import { ConfigProvider } from '../../providers/config/config';

declare const Buffer
import Tx from 'ethereumjs-tx';
import Units from 'ethereumjs-units';

@IonicPage()
@Component({
  selector: 'page-comfirm-send',
  templateUrl: 'comfirm-send.html',
})
export class ComfirmSendPage {

  toAddress:any;
  amount:any;
  gasPrice:any;
  data:any;
  receipt:any;
  isSending:boolean;

  constructor(public viewController:ViewController,public configProvider:ConfigProvider,public web3Provider:Web3Provider,public navCtrl: NavController, public navParams: NavParams) {
    this.toAddress = this.navParams.get("toAddress");
    this.amount = this.navParams.get("dMark");

    var tokenInstance = this.web3Provider.getdMarkContract();
    this.data = tokenInstance.transfer.getData(this.toAddress,this.amount);

    var web3 = web3Provider.getWeb3();

    const rawTx = {
        data: this.data,
        to: this.configProvider.dMARK_Address,
        from: web3.eth.defaultAccount
    };

    var result = web3.eth.estimateGas(rawTx);
    this.gasPrice = Units.convert(result, 'wei', 'eth') + " ETH";

    this.isSending = false;
  }

  reject() {
    this.viewController.dismiss({status:false});
  }

  sign() {
    this.isSending = true;


    // privateKey needed via biometrics
    var privateKey = new Buffer(this.web3Provider.privateaddress, 'hex')

    var web3 = this.web3Provider.getWeb3();
    const gasPriceHex = web3.toHex(web3.eth.gasPrice);
    const gasLimitHex = web3.toHex(300000);

    const nonce = web3.eth.getTransactionCount(this.web3Provider.paddress);
    const nonceHex = web3.toHex(nonce);

    const rawTx = {
        nonce:nonceHex,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: this.data,
        to: this.configProvider.dMARK_Address,
        from: web3.eth.defaultAccount
    };

    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();


    var self = this;
    web3.eth.sendRawTransaction(serializedTx.toString('hex'), (err, hash) => {
        if (err) { console.log(err); return; }
        self.waitForTransactionReceipt(hash);
    });

  }

  waitForTransactionReceipt(hash) {
      this.receipt = this.web3Provider.getWeb3().eth.getTransactionReceipt(hash);
      if (this.receipt == null) {
          setTimeout(() => { this.waitForTransactionReceipt(hash); }, 1000);
      } else {
          console.log('Contract Address: ', this.receipt);
          this.viewController.dismiss({status:true});
      }
  }

  ionViewDidLoad() {

  }

}
