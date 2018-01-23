import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
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
    if(this.playerNumber<4||this.playerNumber===undefined){
      this.error=true;
    }else{
      this.error=false;
      let num={
        number: this.playerNumber
      }
      let pate = this.modalCtrl.create(RoundsPage,num);
      pate.onDidDismiss(data=>{
        this.playerNumber=data;
      });
      pate.present();
    }
    

  }

}