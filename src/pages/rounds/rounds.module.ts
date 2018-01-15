import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoundsPage } from './rounds';

@NgModule({
  declarations: [
    RoundsPage,
  ],
  imports: [
    IonicPageModule.forChild(RoundsPage),
  ],
})
export class RoundsPageModule {}
