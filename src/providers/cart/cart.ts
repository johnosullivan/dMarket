import { Injectable } from '@angular/core';

@Injectable()
export class CartProvider {

  mycart:any;

  constructor() {
    this.mycart = [];
  }

  add(item) {
    this.mycart.push(item);
  }

}
