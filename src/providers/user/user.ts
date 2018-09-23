import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { IpfsProvider } from '../ipfs/ipfs';
import { Web3Provider } from '../../providers/web3/web3';
import { Storage } from '@ionic/storage';

import aesjs from "aes-js";

@Injectable()
export class UserProvider {

  user_data:any;
  constructor(
    public web3Provider:Web3Provider,
    public ipfsProvider:IpfsProvider,
    public http: HttpClient,
    public configProvider:ConfigProvider,
    public storage:Storage
  ) {
    this.user_data = {};
  }

  getProfile(hash) {
    this.http.get(this.configProvider.IPFS_Address + '/ipfs/' + hash).subscribe(data => {
      console.log("UserData: ", data);
      this.user_data = data;
    })
  }

  newProfile() {
    this.ipfsProvider.new(this.web3Provider.paddress).then((hash) => {
      this.getProfile(hash);
    });
  }

  addTransaction(hash) {
    if (this.user_data['transactions'] === undefined) {
      this.user_data['transactions'] = [];
      this.user_data['transactions'].push(hash);
      this.update();
    } else {
      this.user_data['transactions'].push(hash);
      this.update();
    }
  }

  update() {
    this.ipfsProvider.update(this.web3Provider.paddress, this.user_data).then((hash) => {
      this.getProfile(hash);
    });
  }

  getAddresses() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.storage.get('addresses').then((addresses) => {
        resolve(addresses);
      });
    });
  }

  setAddresses() {
    var temp = [];

    temp.push({"address":"723 Ouilmette Ln.","apt":"","city":"Wilmette","state":"IL","zip":"60091"});

    temp.push({"address":"40 E Oak St.","apt":"1511","city":"Chiccago","state":"IL","zip":"60611"});

    this.storage.set("addresses",temp);
  }

}
