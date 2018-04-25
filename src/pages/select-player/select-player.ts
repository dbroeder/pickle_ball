import { Component, NgZone } from '@angular/core';
import {  NavController, NavParams,ViewController,ModalController, Platform } from 'ionic-angular';
import { LeaguePlayPage } from '../league-play/league-play';
import {PlayersProvider} from '../../providers/players/players';
import {CreateGroupsPage} from '../create-groups/create-groups';
import {Observable} from 'rxjs/Observable';

interface Players {
  name: string;
  displayName: string;
  rating: number;
  wins: number;
  roundsPlayed: number;
  winPercentage: number;
  isPlaying: boolean;
  userId: string;
  playedSingles:boolean;
  playedBye: boolean;
  $id: string;
}

@Component({
  selector: 'page-select-player',
  templateUrl: 'select-player.html',
})
export class SelectPlayerPage {

  players$: Observable<Players[]>;
  playersPlaying$: Observable<Players[]>;
  playersNotPlaying$: Observable<Players[]>;
  filteredList$;
  playingPlayers = [];
  gameType="doubles";
  groupsExist;
  groups=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    public modalCtrl: ModalController, public platform:Platform, public playerProv:PlayersProvider,public zone: NgZone) {
      let backPressed = platform.registerBackButtonAction(() => {
      backPressed();
      
    },9);
    
  }
  ionViewWillEnter(){
    
    
  }

  filterPlayers(filterParam){
    return this.players$.map((players)=>{
      players.filter((player)=>{
        return player.isPlaying==filterParam;
      })
    })

  }


  createGroup(){
    let modal =this.modalCtrl.create(CreateGroupsPage);
    modal.onDidDismiss(()=>{
    })
    modal.present();
  }

  ionViewDidLoad() {
    this.zone.run(()=>{
      this.playersPlaying$ = this.playerProv.getPlayers('isPlaying',true); 
      this.playersNotPlaying$ = this.playerProv.getPlayers('isPlaying',false)
      console.log('ionViewDidLoad SelectPlayerPage');
      //console.log(this.players$);
      //this.filteredList$=this.filterPlayers(true);
      console.log(this.filteredList$)
    
    })
  }

  getIndexOfId(player) {
    let id = -1;
    for (let i = 0; i < this.playingPlayers.length; i++) {
      if (player._id == this.playingPlayers[i]._id) {
        id = i;
      }
    }
    return id;
  }

  

  addPlayer(player) {
    if(player.isPlaying==true){
      this.playerProv.updatePlayer(player.$id,{isPlaying:false})
    }else{
      this.playerProv.updatePlayer(player.$id,{isPlaying:true})
    }

    

    /*
    player.isPlaying = true;
    let id=this.getIndexOfId(player)
    if(id==-1){
      this.playingPlayers.push(player);
    }
    else{
      this.playingPlayers.splice(id);
    }
    console.log("Playing Players array")
    console.log(this.playingPlayers)
    */
    
  }

  startRounds(){
    let passParams={
      playingPlayers: this.playingPlayers,
      gameType: this.gameType
    }
    let modal = this.modalCtrl.create(LeaguePlayPage, passParams);
    modal.present();

  }

}
