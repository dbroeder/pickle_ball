import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaguePlayPage } from './league-play';

@NgModule({
  declarations: [
    LeaguePlayPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaguePlayPage),
  ],
})
export class TestPageModule {}