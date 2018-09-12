import { Component, NgZone } from '@angular/core';
import {  NavController, NavParams,ViewController,ModalController, Platform, IonicPage } from 'ionic-angular';
import {PlayersProvider} from '../../providers/players/players';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

@IonicPage()
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
  groups$:Observable<string[]>
  unsubscribe: Subject<void>= new Subject<void>();
  groupUnsubscribe: Subject<void>= new Subject<void>();

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
    this.groupUnsubscribe.next();
    this.groupUnsubscribe.complete();
    this.playerProv.batchWrite((doc)=>{
      if(doc.data().isPlaying==true){
        this.playerProv.updatePlayer(doc.id,{isPlaying:false})
      }
    })
    let modal =this.modalCtrl.create("CreateGroupsPage");
    modal.onDidDismiss(()=>{
      this.unsubscribe=new Subject<void>()
      this.groupUnsubscribe = new Subject<void>()
      this.groups$=this.playerProv.getGroups(this.groupUnsubscribe)
      this.players$=this.playerProv.getPlayers(this.unsubscribe)
      this.playersPlaying$=this.filterPlayers(true)
      this.playersNotPlaying$=this.filterPlayers(false)
    })
    modal.present();
  }

  deleteGroup(){
    
  }

  ionViewDidLoad() {
    this.zone.run(()=>{
      this.groups$=this.playerProv.getGroups(this.groupUnsubscribe)
      this.players$ = this.playerProv.getPlayers(this.unsubscribe); 
      this.playersPlaying$=this.filterPlayers(true)
      this.playersNotPlaying$=this.filterPlayers(false)
      
      
      this.groups$.forEach(val=>{
        if(val){
          this.groupsExist=true
        }else{
          this.groupsExist=false;
        }
      })
    })
  }


  selectPlayers(group){
    this.playerProv.batchWrite((doc)=>{
      if(doc.data().groups.some(val=>{
        return val==group
      })){
        this.playerProv.updatePlayer(doc.id,{isPlaying: true})
      }
      else if(doc.data().isPlaying==true){
        this.playerProv.updatePlayer(doc.id,{isPlaying: false})
      }
    })
  }
  

  addPlayer(player) {
    if(player.isPlaying==true){
      this.playerProv.updatePlayer(player.$id,{isPlaying:false})
    }else{
      this.playerProv.updatePlayer(player.$id,{isPlaying:true})
    }
    
  }

  goBack(){
    this.viewCtrl.dismiss()
  }

  startRounds(){
    let passParams={
      playingPlayers: this.playingPlayers,
      gameType: this.gameType
    }
    let modal = this.modalCtrl.create("LeaguePlayPage", passParams);
    modal.onDidDismiss(()=>{
      this.navCtrl.popAll().catch((e)=>{
        console.error(e)
      })
    })
    modal.present();

  }

}
