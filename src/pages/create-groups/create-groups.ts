import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import{PlayersProvider} from "../../providers/players/players";
import { Observable } from 'rxjs/Observable';
interface Players {
  name: string;
  displayName: string;
  rating: number;
  wins: number;
  roundsPlayed: number;
  winPercentage: number;
  isPlaying: boolean;
  userId:string;
  playedSingles:boolean;
  playedBye: boolean;
  groups: Array<any>;
  currentGame:string; 
  $id:string;

  
}

@Component({
  selector: 'page-create-groups',
  templateUrl: 'create-groups.html',
})
export class CreateGroupsPage {
  players;
  groupPlayers;
  groupName;
  groups=[];
  nameError=false;
  playerError=false;
  errorMessage;
  group;

  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,public playerProv:PlayersProvider) {
    
    
    
  } 

  ionViewDidLoad(){
    this.players=this.playerProv.getPlayers('isPlaying',false).subscribe();
    this.groupPlayers=this.playerProv.getPlayers('isPlaying',true).subscribe();
    console.log("Players Subscribed",this.players)
    
  }

  checkGroupName(){
    let nameExists=false;
    this.groups.forEach((element)=>{
      if(element.name==this.groupName){
        nameExists=true;
      }
    })
    return nameExists;
  }

  addPlayer(player){
    if(player.isPlaying==false){
      this.playerProv.updatePlayer(player.$id,{isPlaying:true})
    }
    else{
      this.playerProv.updatePlayer(player.$id,{isPlaying:false})
    }
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  saveGroup(){
    console.log("Group Name "+this.groupName);
    if(this.groupName==undefined||!this.checkGroupName()||this.groupPlayers.length==0){
      if(this.groupName==undefined){
        this.errorMessage="Please enter a group name.";
        this.nameError=true;
      }
      else if(this.checkGroupName()){
        this.errorMessage="Group name already exists.";
        this.nameError=true;
      }else{
        this.nameError=false;
      }
      if(this.groupPlayers.length==0){
        this.playerError=true;
      }
      else{
        this.playerError=false;
      }
     
    }
    if(this.nameError==false && this.playerError==false){
          
    }
    
    
    console.log("Groups");
    console.log(this.groups);
    this.viewCtrl.dismiss();
    


  }

  getIndexOfId(player) {
    let id = -1;
    for (let i = 0; i < this.groupPlayers.length; i++) {
      if (player._id == this.groupPlayers[i]._id) {
        id = i;
      }
    }
    return id;
  }

  
}
