import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListingPage } from './listing';

@NgModule({
  declarations: [
    ListingPage,
  ],
  imports: [
    IonicPageModule.forChild(ListingPage),
  ],
})
export class ListingPageModule {}
