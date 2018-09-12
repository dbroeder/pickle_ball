import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateGroupsPage } from './create-groups';

@NgModule({
  declarations: [
    CreateGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateGroupsPage),
  ],
})
export class TestPageModule {}