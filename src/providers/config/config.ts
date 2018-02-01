import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class ConfigProvider {
  public ETH_URL: string;
  public dMARK_Address: string;
  public dUSER_Address: string;
  public IPFS_Address: string;

  //TODO Need to add dot env plugin for dev/prod env variables
  constructor() {
    this.ETH_URL = this._readString('ETH_URL', 'http://localhost:8545');
    this.dMARK_Address = this._readString('dMARK_Address', '0x8cdaf0cd259887258bc13a92c0a6da92698644c0');
    this.dUSER_Address = this._readString('dUSER_Address', '0x972942f5a240de0341ccd529c87e271402edce2c');
    this.IPFS_Address = this._readString('IPFS_Address', 'http://127.0.0.1:8080');
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
