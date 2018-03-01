import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {CreatePlayerPage} from '../create-player/create-player';
import {PlayersProvider} from '../../providers/players/players';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  playersDontExist=false;
  players;


  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public playerProv: PlayersProvider) {
   
    
  }

  ionViewDidLoad(){
    this.getPlayers();
    
  }

  getPlayers(){
    console.log(this.playerProv.get('players'))
    this.playerProv.get('players').then((value)=>{
      this.players=value;
    });
    if(this.players==undefined){
      this.playersDontExist=true;
    }else{
      this.playersDontExist=false;
    }
  }

  openPlayer(player){
    let modal = this.modalCtrl.create(CreatePlayerPage,player.id);
    modal.onDidDismiss(()=>{
      this.getPlayers();
    });
    modal.present();
  }

  createPlayer(){
    let id={
      id:-1
    };
    let modal = this.modalCtrl.create(CreatePlayerPage,id);
    modal.onDidDismiss(()=>{
      this.getPlayers();
    });
    modal.present();
  }


}
