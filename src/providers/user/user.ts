import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { IpfsProvider } from '../ipfs/ipfs';
import { Web3Provider } from '../../providers/web3/web3';

@Injectable()
export class UserProvider {

  user_data:any;
  constructor(
    public web3Provider:Web3Provider,
    public ipfsProvider:IpfsProvider,
    public http: HttpClient,
    public configProvider:ConfigProvider
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

}
