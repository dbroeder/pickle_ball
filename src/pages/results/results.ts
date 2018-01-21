import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';




@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  players;
  rounds;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.players=this.navParams.get('players');
  }



}
