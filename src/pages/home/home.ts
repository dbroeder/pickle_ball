import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {RemovePlayerPage} from '../remove-player/remove-player'
import {RoundsPage} from '../rounds/rounds';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  playerNumber:number;
  error=false;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
   
  }

  play(){
    if(this.playerNumber<2||this.playerNumber===undefined){
      this.error=true;
    }else{
      let num={
        number: this.playerNumber
      }
      let pate = this.modalCtrl.create(RoundsPage,num);
      pate.present();
    }
    

  }

}