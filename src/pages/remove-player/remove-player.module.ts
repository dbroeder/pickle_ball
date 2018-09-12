import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemovePlayerPage } from './remove-player';

@NgModule({
  declarations: [
    RemovePlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(RemovePlayerPage),
  ],
})
export class TestPageModule {}