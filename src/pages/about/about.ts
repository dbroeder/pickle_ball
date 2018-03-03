import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {CreatePlayerPage} from '../create-player/create-player';
import {PlayersProvider} from '../../providers/players/players';
import {SelectPlayerPage} from '../../pages/select-player/select-player';

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

  selectPlayers(){
    let passParams={
      players:this.players
    }
    let modal = this.modalCtrl.create(SelectPlayerPage,passParams);
    modal.present();
  }

  getPlayers(){
    
    this.playerProv.get('players').then((value)=>{
      this.players=value;
      if(this.players==undefined){
        this.playersDontExist=true;
      }else{
        this.playersDontExist=false;
      }
      console.log(this.players)
    });
    
    
  }

  openPlayer(player){
    console.log(player);
    let passParams={
      player:player
    };
    let modal = this.modalCtrl.create(CreatePlayerPage,passParams);
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
