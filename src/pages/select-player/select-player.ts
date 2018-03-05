import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';



@Component({
  selector: 'page-select-player',
  templateUrl: 'select-player.html',
})
export class SelectPlayerPage {

  players;
  playingPlayers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    public modalCtrl: ModalController) {
    this.players = navParams.get("players");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPlayerPage');
    console.log(this.players);
  }

  getIndexOfId(player) {
    let id = -1;
    for (let i = 0; i < this.playingPlayers.length; i++) {
      if (player._id == this.playingPlayers[i]._id) {
        id = i;
      }
    }
    return id;
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  addPlayer(player) {
    player.isPlaying = true;
    let id=this.getIndexOfId(player)
    if(id==-1){
      this.playingPlayers.push(player);
    }
    else{
      this.playingPlayers.splice(id);
    }
    console.log("Playing Players array")
    console.log(this.playingPlayers)
    
  }

  startRounds(){
    let passParams={
      playingPlayers:this.playingPlayers
    }
    let modal = this.modalCtrl.create

  }

}
