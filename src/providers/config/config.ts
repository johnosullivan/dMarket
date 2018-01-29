import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class ConfigProvider {
  public ETH_URL: string;
  public dMARK_Address: string;
  public dUSER_Address: string;

  constructor() {
    this.ETH_URL = this._readString('ETH_URL', 'http://192.168.50.52:7545');
    this.dMARK_Address = this._readString('dMARK_Address', '0x972942f5a240de0341ccd529c87e271402edce2c');
    this.dUSER_Address = this._readString('dUSER_Address', '0x9b6a4e055f0acaf54919ac3fbcbf54d8c76aa363');
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
