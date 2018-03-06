import { Component } from '@angular/core';
import {Platform, NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  players;
  rounds;
  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
    let backPressed = platform.registerBackButtonAction(() => {
      console.log("Rounds page back pressed");
      this.navCtrl.pop();
      backPressed();
      
    },11);
  }

  ionViewDidLoad() {
    this.players=this.navParams.get('players');
  }



}
