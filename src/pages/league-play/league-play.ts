import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';



@Component({
  selector: 'page-league-play',
  templateUrl: 'league-play.html',
})
export class LeaguePlayPage {

  playingPlayers=[];
  gameType;


  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform) {
    this.playingPlayers=this.navParams.get("playingPlayers");
    this.gameType=this.navParams.get('gameType');
    let backPressed = platform.registerBackButtonAction(() => {
      console.log("Rounds page back pressed");
      //this.reset();
      backPressed();
      
    },10);
  }

  ionViewDidLoad() {
    console.log("players that are playing "+this.gameType+" format");
    console.log(this.playingPlayers);
    
  }

  roundRobin(){
    
  }



}
