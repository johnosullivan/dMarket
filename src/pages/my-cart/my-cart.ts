import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { UserProvider } from '../../providers/user/user';
import { Web3Provider } from '../../providers/web3/web3';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  items: any;
  total: any;
  addresses: any;
  address: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public cartProvider: CartProvider,
    public userProvider: UserProvider,
    public web3Provider: Web3Provider,
    private alertCtrl: AlertController
  ) {
    this.items = cartProvider.mycart;
    this.total = 0;
    this.addresses = [];
    this.address = '';

    this.findTotal();

    this.userProvider.getAddresses().then((list) => {
      console.log("Address: ", list);
      this.addresses = list;
    });
  }

  ionViewDidLoad() {

  }

  order() {
    console.log("Order: ",this.items);
    console.log("Address: ",this.address);

    var size = this.items.length;
    var quantities = [];
    var costs = [];
    var owners = [];
    var pids = "";

    for (var i = 0; i < this.items.length; i++) {
      quantities.push(this.items[i].quantity);
      costs.push(parseInt(this.items[i].product['price']));

      owners.push(this.items[i].product['owner']);

      pids =  pids + (this.items[i].product['productID'] + '-');
    }

    console.log(owners);

    this.web3Provider.createOrder(this.address,size,costs,quantities,owners,pids);
    this.cartProvider.mycart = [];
    this.closeModal();
  }

  findTotal() {
    for (var i = 0; i < this.items.length; i++) {
      this.total += (parseInt(this.items[i].product['price']) * this.items[i].quantity);
    }
  }

  deleteAtIndex(index, item) {
    console.log(item);
    let prompt = this.alertCtrl.create({
      title: 'Quantity',
      message: 'Select Quantity',
      inputs: [
        {
          type: 'radio',
          label: 'Delete',
          value: '0'
        },
        {
          type: 'radio',
          label: '1',
          value: '1'
        },{
          type: 'radio',
          label: '2',
          value: '2'
        },{
          type: 'radio',
          label: '3',
          value: '3'
        },{
          type: 'radio',
          label: '4',
          value: '4'
        },{
          type: 'radio',
          label: '5',
          value: '5'
        },{
          type: 'radio',
          label: '6',
          value: '6'
        },{
          type: 'radio',
          label: '7',
          value: '7'
        },{
          type: 'radio',
          label: '8',
          value: '8'
        },{
          type: 'radio',
          label: '9',
          value: '9'
        },{
          type: 'radio',
          label: '10',
          value: '10'
        }],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
          }
        },
        {
          text: "Set",
          handler: data => {
            console.log(data);
          }
        }]
    });
    prompt.present();

  }

  closeModal() {
    this.viewController.dismiss({ status: false });
  }

  getImage(item) {
    if (item['images'].length !== 0) {
      return item['images'][0];
    }
    return "http://clipground.com/images/picture-not-available-clipart-12.jpg";
  }

}
