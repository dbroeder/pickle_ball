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
  editPlayerBool=false;
  name;
  displayName;
  rating;
  playerList;
  totalPlayerNumber;
  nameDupError=false;
  ratingError=false;
  createPlayerBool=false;


  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public playerProv: PlayersProvider) 
    {

    this.playerProv.get('players').then((val)=>{
      this.playerList=val;
      if(this.player_id==-1||this.player_id==undefined){
        console.log('new player');
        this.createPlayerBool=true;
      }else{
        this.player=this.getPlayer(this.player_id);
        this.editPlayerBool=true;
        
      }
    });
    this.playerProv.get('playerLength').then((val)=>{
      this.totalPlayerNumber=val;
    });
    
    this.player_id=navParams.get('id');
    
  }

  getPlayer(num){
    for(var player of this.playerList){
      if(player.id==num){
        return player.id;
      }
    }
  }

  ionViewDidLoad() {
    
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  checkErrors(string, num){
    let unique=true;
    if(this.playerList!=undefined){
      for(let player of this.playerList){
      if(player.name==string)
      {
        this.nameDupError=true;
        unique=false;
      }
    }
    if(num>5 || num<1){
      this.ratingError=true;
      unique=false;
    }
    return unique;
    }else{
      return unique;
    }
    
  }

  createPlayer(){
    console.log(this.totalPlayerNumber);
    if(this.checkErrors(this.name,this.rating)){
      if(this.totalPlayerNumber!=undefined){
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
        this.playerProv.set('playerLength',this.totalPlayerNumber+1);
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
        console.log(newPlayer);
        this.playerList.push(newPlayer);
        this.playerProv.set('players',this.playerList);
        this.playerProv.set('playerLength','1');
        
      }
      
      this.viewCtrl.dismiss();
    }
    
  }

}
