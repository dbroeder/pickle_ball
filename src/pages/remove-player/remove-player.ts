import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the RemovePlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-remove-player',
  templateUrl: 'remove-player.html',
})
export class RemovePlayerPage {

  playerNum:number;
  totalNumofPlayers:number;
  greatestId;

  constructor(public platform: Platform, public alertCtrl: AlertController ,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let backPressed = platform.registerBackButtonAction(() => {
      console.log("Rounds page back pressed");
      this.viewCtrl.dismiss();
      backPressed();
      
    },3);
    this.totalNumofPlayers=this.navParams.get('totalPlayerNums');
    

  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad RemovePlayerPage');
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  removePlayer(){
    if(this.playerNum!==undefined&&this.playerNum>=1&&this.playerNum<=this.totalNumofPlayers){
      this.viewCtrl.dismiss(this.playerNum);
    }else{
      let alert=this.alertCtrl.create({
        title:'Try Again',
        subTitle:'That player does not exist. Enter a player number between 1 and '+this.totalNumofPlayers,
        buttons:['ok']
      });
      alert.present();
    }
    
  }

}
