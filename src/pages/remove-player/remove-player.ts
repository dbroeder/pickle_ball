import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RemovePlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remove-player',
  templateUrl: 'remove-player.html',
})
export class RemovePlayerPage {

  playerNum:number;
  totalNumofPlayers:number;

  constructor(public alertCtrl: AlertController ,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.totalNumofPlayers=this.navParams.get('totalPlayerNums');
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
