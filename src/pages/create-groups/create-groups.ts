import { Component, NgZone } from '@angular/core';
import { NavController, NavParams,ViewController, IonicPage } from 'ionic-angular';
import{PlayersProvider} from "../../providers/players/players";
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

@IonicPage()
@Component({
  selector: 'page-create-groups',
  templateUrl: 'create-groups.html',
})
export class CreateGroupsPage {
  players: Observable<Players[]>;
  groupPlayers$: Observable<Players[]>;
  groupName;
  groups=[];
  nameError=false;
  playerError=false;
  errorMessage;
  group;
  unsubscribe: Subject<void>=new Subject<void>();
  nonGroup$:  Observable<Players[]>;
  saveBoolean = true;

  constructor(public zone: NgZone,public viewCtrl:ViewController,public navCtrl: NavController,
     public navParams: NavParams,public playerProv:PlayersProvider) {
    this.groupName=navParams.get('groupName')
    
    
  } 

  ionViewDidLoad(){
    this.zone.run(()=>{
      this.players = this.playerProv.getPlayers(this.unsubscribe); 
      this.groupPlayers$=this.filterPlayers(true)
      this.nonGroup$ = this.filterPlayers(false)
      
    
    })
    
  }

  checkName(){
    if(this.groupName){
      this.saveBoolean=false;
    }else{
      this.saveBoolean=true;
    }
  }

  filterPlayers(filterParam){
    return this.players.map((players)=>{
      return players.filter((player)=>{
        return player.isPlaying==filterParam;
      })
    })

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
    this.playerProv.batchWrite((doc)=>{
      if(doc.data().isPlaying==true){
        this.playerProv.updatePlayer(doc.id,{isPlaying:false})
      }
    })
    this.viewCtrl.dismiss();
  }


  saveGroup(){
    this.playerProv.batchWrite((doc)=>{
      if(!doc.data().groups.some((d)=>{
        return d == this.groupName
      })&&doc.data().isPlaying){
        console.log("adding "+doc.data().name)
        let tempGroups = doc.data().groups
        tempGroups.push(this.groupName)
        this.playerProv.updatePlayer(doc.id,{groups:tempGroups,isPlaying:false})
      }else if(doc.data().isPlaying==true){
        this.playerProv.updatePlayer(doc.id,{isPlaying:false})
      }
    })
    this.playerProv.createGroup(this.groupName)
    this.viewCtrl.dismiss();
    


  }

  

  
}
