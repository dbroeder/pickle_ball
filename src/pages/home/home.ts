import { Component } from '@angular/core';
import { NavController, ModalController, Platform,AlertController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{
  
  playerNumber:number;
  error=false;
  gameType="doubles";

 

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, public platform: Platform, public alertCtrl: AlertController) {
     this.platform.registerBackButtonAction(()=>{

     });
    



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
      let pate = this.modalCtrl.create("RoundsPage",num);
      pate.present();
    }
    

  }

}