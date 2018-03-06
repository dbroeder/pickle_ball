import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-league-play',
  templateUrl: 'league-play.html',
})
export class LeaguePlayPage {

  playingPlayers=[];
  gameType;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playingPlayers=this.navParams.get("playingPlayers");
    this.gameType=this.navParams.get('gameType');
  }

  ionViewDidLoad() {
    
  }

  roundRobin(){
    
  }



}
