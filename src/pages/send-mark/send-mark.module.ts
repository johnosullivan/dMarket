import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMarkPage } from './send-mark';

@NgModule({
  declarations: [
    SendMarkPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMarkPage),
  ],
})
export class SendMarkPageModule {}
