import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-select-player',
  templateUrl: 'select-player.html',
})
export class SelectPlayerPage {

  players;
  playingPlayers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.players = navParams.get("players");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPlayerPage');
    console.log(this.players);
  }

  addPlayer(player) {
    player.isPlaying = true;
    if(this.playingPlayers.findIndex(player)==-1){
      this.playingPlayers.push(player);
    }
    console.log("Playing Players array")
    console.log(this.playingPlayers)
    
  }

}
