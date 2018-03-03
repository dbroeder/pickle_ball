import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPlayerPage } from './select-player';

@NgModule({
  declarations: [
    SelectPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPlayerPage),
  ],
})
export class SelectPlayerPageModule {}
