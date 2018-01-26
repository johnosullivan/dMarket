import { Injectable } from '@angular/core';

declare var process: any;

@Injectable()
export class ConfigProvider {
  public ETH_URL: string;
  public dMARK_Address: string;

  constructor() {
    this.ETH_URL = this._readString('ETH_URL', 'http://localhost:7545');
    this.dMARK_Address = this._readString('dMARK_Address', '0xf12b5dd4ead5f743c6baa640b0216200e89b60da');
  }

  private _readString(key: string, defaultValue?: string): string {
    const v = process.env[key];
    return v === undefined ? defaultValue : String(v);
  }
}
