import { Component } from '@angular/core';
import { NavController, ModalController,Platform} from 'ionic-angular';
import {CreatePlayerPage} from '../create-player/create-player';
import {PlayersProvider} from '../../providers/players/players';
import {SelectPlayerPage} from '../select-player/select-player';
import { Observable } from 'rxjs/Observable';

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
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  

  playersDontExist=false;
  players: Observable<Players[]>;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public playerProv: PlayersProvider,
    public platform: Platform) {
      platform.registerBackButtonAction(() => {
        //(navigator as any).Backbutton.goHome();
        
        
      });
    
  }
  ionViewWillEnter(){
    this.players = this.playerProv.getPlayers();
  }


  selectPlayers(){
    this.navCtrl.push(SelectPlayerPage);
  }
    

  

  openPlayer(player){

    let passParams={
      player: player
    };
    let modal = this.modalCtrl.create(CreatePlayerPage,passParams);
    modal.present();
  }

  createPlayer(){
    let id={
      player:-1
    };
    let modal = this.modalCtrl.create(CreatePlayerPage,id);
    modal.present();
  }


}
