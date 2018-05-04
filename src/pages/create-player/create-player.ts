import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, Platform } from 'ionic-angular';
import { PlayersProvider } from '../../providers/players/players';
import {PlayaProvider} from '../../providers/playa/playa';


@Component({
  selector: 'page-create-player',
  templateUrl: 'create-player.html',
})
export class CreatePlayerPage {

  player;
  editPlayerBool = false;
  name;
  displayName: string;
  rating;
  playerList = [];
  totalPlayerNumber;
  nameDupError = false;
  ratingError = false;
  dispNameError = false;
  createPlayerBool = false;
  oldPlayer;
  errorMessage='';


  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public playerProv: PlayersProvider,
  public platform: Platform,
  public playaProv: PlayaProvider) {

    let backPressed = platform.registerBackButtonAction(() => {
      this.goBack();
      backPressed();
      
    },11);
    this.player = navParams.get('player');
    if (this.player != -1) {
      this.displayName = this.player.displayName;
      this.name = this.player.name;
      this.rating = Number(this.player.rating);
      this.editPlayerBool=true;
    }else{
      this.createPlayerBool=true;
    }
    console.log(this.player)

  }
 
  savePlayer() {
    this.player.name = this.name;
    this.player.rating = this.rating;
    this.player.displayName = this.displayName;
    if (this.checkErrors(this.player.name, this.player.rating, this.player.displayName, this.player._id)) {
      this.playerProv.updatePlayer(this.player.$id,{name:this.name,rating:this.rating,displayName:this.displayName});
      this.viewCtrl.dismiss()

    }



  }

  goBack() {
    this.viewCtrl.dismiss();
  }

  deletePlayer(){
    this.playerProv.deletePlayer(this.player);
    this.viewCtrl.dismiss();
    
  }

  checkDispLength(element){
    const max_length=3;
    if (this.displayName) {
      if (this.displayName.length > max_length) {
        this.displayName = this.displayName.substr(0, max_length)
      }
    }
  }

  checkErrors(name, num, dispName, id?) {
      let unique = true;
    
      console.log("Name exists: " +this.playerProv.checkExistingNames(name,id))
      if (this.playerProv.checkExistingNames(name,id) || !name) {
        this.nameDupError = true;
        unique = false;
        this.errorMessage = "name is blank or already exists";
      }
      if (!dispName || dispName.length > 3) {
        this.dispNameError = true;
        unique = false;
        this.errorMessage = 'needs at most 3 characters'
      } 
      if (num > 5 || num < 1 || !num) {
        this.ratingError = true;
        unique = false;
      }
      return unique
    
  }

  createPlayer() {
   
      
      if(this.checkErrors(this.name, this.rating, this.displayName,-1)){
        this.playerProv.addPlayer(this.playaProv.createPlayaByName(this.name,this.displayName,Number(this.rating)))


        this.viewCtrl.dismiss();
      }
    
     
        
    

  }

}