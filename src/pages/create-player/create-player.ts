import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,ViewController } from 'ionic-angular';
import {PlayersProvider} from '../../providers/players/players';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';




@Component({
  selector: 'page-create-player',
  templateUrl: 'create-player.html',
})
export class CreatePlayerPage {

  player_id;
  player;
  editPlayer;
  name;
  displayName;
  rating;
  playerList;
  totalPlayerNumber;
  dispNameError=false;
  ratingError=false;

  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public playerProv: PlayersProvider) 
    {

    this.playerList=this.playerProv.get('players');
    this.totalPlayerNumber=this.playerProv.get('playerLength');
    this.player_id=navParams.get('id');
    console.log(this.player_id);
    if(this.player_id==-1||this.player_id==undefined){
      console.log('here');
      this.editPlayer=true;
    }else{
      this.player=this.getPlayer(this.player_id);
      this.editPlayer=false;
      
    }
  }

  getPlayer(num){
    for(var player of this.playerList){
      if(player.id==num){
        return player.id;
      }
    }
  }

  ionViewDidLoad() {
    console.log(this.totalPlayerNumber);
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  checkErrors(string, num){
    var unique=true;
    for(let player of this.playerList){
      if(player.displayName==string)
      {
        this.dispNameError=true;
        unique=false;
      }
    }
    if(num>5 || num<1){
      this.ratingError=true;
      unique=false;
    }
    return unique;
  }

  createPlayer(){
    console.log(this.totalPlayerNumber);
    if(this.checkErrors(this.displayName,this.rating)){
      if(this.totalPlayerNumber!==undefined){
        let newPlayer={
          name: this.name,
          displayName: this.displayName,
          rating: this.rating,
          wins: 0,
          roundsPlayed: 0,
          winPercentage:0,
          _id: this.totalPlayerNumber+1
        }
        this.playerList.push(newPlayer);
        this.playerProv.set('players',this.playerList);
        this.playerProv.set('playerLength',1);
      }else{
        let newPlayer={
          name: this.name,
          displayName: this.displayName,
          rating: this.rating,
          wins: 0,
          roundsPlayed: 0,
          winPercentage:0,
          _id: 0
        }
        this.playerList=[];
        this.playerList.push(newPlayer);
        this.playerProv.set('players',this.playerList);
        this.playerProv.set('playerLength',this.totalPlayerNumber+1);
        
      }
      this.viewCtrl.dismiss();
    }
    
  }

}
