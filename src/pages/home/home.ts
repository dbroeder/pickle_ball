import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import {RoundsPage} from '../rounds/rounds';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  
  playerNumber:number;
  error=false;
  gameType="doubles";

 

  constructor( public navCtrl: NavController, 
    public modalCtrl: ModalController, public platform: Platform) {
   
    platform.registerBackButtonAction(()=>{
      console.log("home page back pressed");
    },1)

  }

  ionViewDidLoad(){
    
  }

  play(){
    if(this.playerNumber<4||this.playerNumber===undefined){
      this.error=true;
    }else{
      this.error=false;
      let num={
        number: this.playerNumber,
        gameType: this.gameType
      }
      let pate = this.modalCtrl.create(RoundsPage,num);
      pate.present();
    }
    

  }

}