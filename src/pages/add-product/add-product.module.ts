import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductPage } from './add-product';

@NgModule({
  declarations: [
    AddProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductPage),
  ],
})
export class AddProductPageModule {}
