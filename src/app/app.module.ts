import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SendMarkPage } from '../pages/send-mark/send-mark';
import { ComfirmSendPage } from '../pages/comfirm-send/comfirm-send';
import { AddUserPage } from '../pages/add-user/add-user';
import { ListingPage } from '../pages/listing/listing';
import { AddProductPage } from '../pages/add-product/add-product';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Web3Provider } from '../providers/web3/web3';
import { ConfigProvider } from '../providers/config/config';
import { ABIProvider } from '../providers/web3/abi';
import { IonicStorageModule } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserProvider } from '../providers/user/user';
import { IpfsProvider } from '../providers/ipfs/ipfs';
import { WindowRef } from './window';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { CartProvider } from '../providers/cart/cart';

/*
android -> on a device running Android.
cordova ->	on a device running Cordova.
core -> on a desktop device.
ios -> on a device running iOS.
ipad -> on an iPad device.
iphone -> on an iPhone device.
mobile -> on a mobile device.
mobileweb -> in a browser on a mobile device.
phablet -> on a phablet device.
tablet -> on a tablet device.
windows -> on a device running Windows.
*/

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddUserPage,
    SendMarkPage,
    ComfirmSendPage,
    ListingPage,
    AddProductPage,
    ItemDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddUserPage,
    SendMarkPage,
    ComfirmSendPage,
    ListingPage,
    AddProductPage,
    ItemDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Web3Provider,
    ConfigProvider,
    ABIProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    IpfsProvider,
    WindowRef,
    CartProvider
  ]
})
export class AppModule {}
