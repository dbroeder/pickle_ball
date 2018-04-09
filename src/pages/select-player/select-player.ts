import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,ModalController, Platform } from 'ionic-angular';
import { LeaguePlayPage } from '../league-play/league-play';
import {PlayersProvider} from '../../providers/players/players';
import {CreateGroupsPage} from '../create-groups/create-groups';
import {Observable} from 'rxjs/Observable';

interface Players {
  name: string;
  displayName: string;
  rating: number;
  wins: number;
  roundsPlayed: number;
  winPercentage: number;
  isPlaying: boolean;
  _id: number;
  playedSingles:boolean;
  playedBye: boolean;
}

@Component({
  selector: 'page-select-player',
  templateUrl: 'select-player.html',
})
export class SelectPlayerPage {

  players: Observable<Players[]>;
  playingPlayers = [];
  gameType="doubles";
  groupsExist;
  groups=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    public modalCtrl: ModalController, public platform:Platform, public playerProv:PlayersProvider) {
      let backPressed = platform.registerBackButtonAction(() => {
      this.goBack();
      backPressed();
      
    },9);

  }
  ionViewWillEnter(){
    
    this.players = this.playerProv.getPlayers(); 
    console.log('ionViewDidLoad SelectPlayerPage');
    console.log(this.players);
  }



  createGroup(){
    let modal =this.modalCtrl.create(CreateGroupsPage);
    modal.onDidDismiss(()=>{
    })
    modal.present();
  }

  ionViewDidLoad() {
    
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
      playingPlayers: this.playingPlayers,
      gameType: this.gameType
    }
    let modal = this.modalCtrl.create(LeaguePlayPage, passParams);
    modal.onDidDismiss(()=>{
      this.goBack();
    })
    modal.present();

  }

}
