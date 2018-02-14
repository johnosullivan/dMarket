import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySettingsPage } from './my-settings';

@NgModule({
  declarations: [
    MySettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MySettingsPage),
  ],
})
export class MySettingsPageModule {}
