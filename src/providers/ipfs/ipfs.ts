import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../user/user';
import { ConfigProvider } from '../config/config';

//http://127.0.0.1:8080/ipfs/
import ipfsAPI from 'ipfs-api';
declare const Buffer;

@Injectable()
export class IpfsProvider {

  ipfs:any;
  constructor(
    public http: HttpClient,
    public storage:Storage,
    public configProvider:ConfigProvider
  ) {
    this.ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
  }

  new(publicAddress) {
    var self = this;
    var paddress = publicAddress;
    return new Promise(function (resolve, reject) {
      var data = new Buffer('{}');
      var path = "dMarket_" + paddress + ".json";
      const stream = self.ipfs.files.addReadableStream();
      stream.on('data', function (file) {
        console.log(file);
        var hash = file['hash'];
        self.storage.set('ipfs', hash);
      });
      stream.write({ path: path, content: data });
      stream.end();
    });
  }

  getItem(item) {
    console.log(item);
    var self = this;
    return new Promise(function (resolve, reject) {
      self.http.get(self.configProvider.IPFS_Address + '/ipfs/' + item.hash).subscribe(data => {
        for(var i = 0; i < data['images'].length; i++) {
          data['images'][i] = self.configProvider.IPFS_Address + '/ipfs/' + data['images'][i];
        }
        resolve(data);
      })
    });
  }

  getListing(items) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var promises = [];
      for(var i = 0; i < items.length; i++) { promises.push(self.getItem(items[i])); }
      Promise.all(promises).then(function(items) {
        resolve(items);
      });
    });
  }

  update(publicAddress, data) {
    var self = this;
    var paddress = publicAddress;
    var pdata = data;
    return new Promise(function (resolve, reject) {
      var data = new Buffer(JSON.stringify(pdata));
      var path = "dMarket_" + paddress + ".json";
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
