import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import{PlayersProvider} from "../../providers/players/players";


@Component({
  selector: 'page-create-groups',
  templateUrl: 'create-groups.html',
})
export class CreateGroupsPage {
  players;
  groupPlayers=[];
  groupName;
  groups=[];
  nameError=false;
  playerError=false;
  errorMessage;
  group;

  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,public playerProv:PlayersProvider) {
    playerProv.get("players").then((val)=>{
      this.players=val;
    }) 
    this.playerProv.get("groups").then((val)=>{
      this.groups=val;
      if(this.groups==undefined){
        console.log("undefined group")
        this.groups=[];
      }
    });
    this.group = this.navParams.get("group");
    
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
          let group={
      name:this.groupName,
      players:this.groupPlayers
    }
    
    this.groups.push(group);
    console.log("Groups");
    console.log(this.groups);
   
    this.playerProv.set("groups",this.groups);
    this.viewCtrl.dismiss();
    }


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

  addPlayer(player){
    player.isPlaying = true;
    let id=this.getIndexOfId(player)
    if(id==-1){
      this.groupPlayers.push(player);
    }
    else{
      this.groupPlayers.splice(id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupsPage');
  }

}
