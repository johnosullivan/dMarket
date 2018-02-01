import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../user/user';

import ipfsAPI from 'ipfs-api';
declare const Buffer;

@Injectable()
export class IpfsProvider {

  ipfs:any;
  constructor(
    public http: HttpClient,
    public storage:Storage
  ) {
    this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
  }

  new(publicAddress) {
    var paddress = publicAddress;
    return new Promise(function (resolve, reject) {
      var data = new Buffer('{}');
      var path = "dMarket_" + paddress + ".json";
      console.log(path);
      const stream = this.ipfs.files.addReadableStream();
      var self = this;
      stream.on('data', function (file) {
        console.log(file);
        var hash = file['hash'];
        self.storage.set('ipfs', hash);
      });
      stream.write({ path: path, content: data });
      stream.end();
    });
  }

  update(publicAddress, data) {
    var self = this;
    var paddress = publicAddress;
    var pdata = data;
    return new Promise(function (resolve, reject) {
      var data = new Buffer(JSON.stringify(pdata));
      var path = "dMarket_" + paddress + ".json";
      console.log(path);
      const stream = self.ipfs.files.addReadableStream();
      stream.on('data', function (file) {
        console.log(file);
        var hash = file['hash'];
        self.storage.set('ipfs', hash);
        resolve(hash);
      });
      stream.write({ path: path, content: data });
      stream.end();
    });
  }

}