import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Accounts from 'web3-eth-accounts';
import { ConfigProvider } from '../config/config';
@Injectable()
export class Web3Provider {

  web3:any;
  web3accounts:any;

  constructor(public configProvider:ConfigProvider) {
    console.log("Creating an init of the web3.js");
    this.web3 = new Web3();
    if (typeof this.web3 !== undefined) {
      this.web3accounts = new Web3Accounts(configProvider.ETH_URL);
      this.web3 = new Web3(new Web3.providers.HttpProvider(configProvider.ETH_URL));
    } else {

    }
  }

  getWeb3() {
    return this.web3;
  }

  getWeb3Account() {
    return this.web3accounts;
  }

}
