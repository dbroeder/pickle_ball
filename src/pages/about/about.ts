import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {CreatePlayerPage} from '../create-player/create-player';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  playersExist;
  players=[];


  constructor(public navCtrl: NavController,public storage: Storage, public modalCtrl: ModalController) {
   
    
  }

  ionViewDidLoad(){
    this.getPlayers();
    if(this.players==undefined){
      this.playersExist=false;
    }else{
      this.playersExist=true;
    }
  }

  getPlayers(){
    this.storage.get('players').then((data)=>{
      this.players=data;
      console.log(this.players);
    });
  }

  openPlayer(player){
    let modal = this.modalCtrl.create(CreatePlayerPage,player.id);
    modal.onDidDismiss(data=>{
      this.getPlayers();
    });
    modal.present();
  }

  createPlayer(){
    let id={
      id:-1
    };
    let modal = this.modalCtrl.create(CreatePlayerPage,id);
    modal.onDidDismiss(data=>{
      this.getPlayers();
    });
    modal.present();
  }


}
