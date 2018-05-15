import { Component, NgZone } from '@angular/core';
import {  NavController, NavParams,ViewController,ModalController, Platform } from 'ionic-angular';
import { LeaguePlayPage } from '../league-play/league-play';
import {PlayersProvider} from '../../providers/players/players';
import {CreateGroupsPage} from '../create-groups/create-groups';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { AboutPage } from '../about/about';

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
  groups
  unsubscribe: Subject<void>= new Subject<void>();

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
      return players.filter((player)=>{
        return player.isPlaying==filterParam;
      })
    })

  }


  createGroup(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.playerProv.batchWrite((doc)=>{
      this.playerProv.updatePlayer(doc.id,{isPlaying:false})
    })
    let modal =this.modalCtrl.create(CreateGroupsPage);
    modal.onDidDismiss(()=>{
  
    })
    modal.present();
  }

  ionViewDidLoad() {
    this.zone.run(()=>{
      this.players$ = this.playerProv.getPlayers(this.unsubscribe); 
      this.playersPlaying$=this.filterPlayers(true)
      this.playersNotPlaying$=this.filterPlayers(false)
      //this.playersNotPlaying$ = this.playerProv.getPlayers(this.unsubscribe)
      console.log('ionViewDidLoad SelectPlayerPage');
      //console.log(this.players$);
      //this.filteredList$=this.filterPlayers(true);
      console.log(this.filteredList$)
      this.groups=this.playerProv.getGroups()
      console.log(this.groups)
      
      
    
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

  goBack(){
    this.viewCtrl.dismiss()
  }

  startRounds(){
    let passParams={
      playingPlayers: this.playingPlayers,
      gameType: this.gameType
    }
    let modal = this.modalCtrl.create(LeaguePlayPage, passParams);
    modal.onDidDismiss(()=>{
      this.navCtrl.popAll().catch((e)=>{
        console.error(e)
      })
    })
    modal.present();

  }

}
