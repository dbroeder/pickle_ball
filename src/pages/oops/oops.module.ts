import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OopsPage } from './oops';

@NgModule({
  declarations: [
    OopsPage,
  ],
  imports: [
    IonicPageModule.forChild(OopsPage),
  ],
})
export class OopsPageModule {}
