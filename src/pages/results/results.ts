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
    platform.registerBackButtonAction(()=>{
      this.navCtrl.pop();
    })
  }

  ionViewDidLoad() {
    this.players=this.navParams.get('players');
  }



}
