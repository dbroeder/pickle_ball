import { Component } from '@angular/core';
import { NavController, ModalController,Platform} from 'ionic-angular';

import {PlayersProvider} from '../../providers/players/players';

import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject'

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
  $id:string;
}


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  
  unsubscribe: Subject<void>= new Subject<void>();
  playersDontExist=false;
  players: Observable<Players[]>;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public playerProv: PlayersProvider,
    public platform: Platform) {
      platform.registerBackButtonAction(() => {
        //(navigator as any).Backbutton.goHome();
        
        
      });
      this.playerProv.getNewUser()
      this.playerProv.playersFirstLoad()
    
  }
  ionViewWillEnter(){
    this.players = this.playerProv.getPlayers(this.unsubscribe);
  }
  

  selectPlayers(){
    this.playerProv.batchWrite((doc)=>{
      if(doc.data().isPlaying==true)
      this.playerProv.updatePlayer(doc.id,{isPlaying:false})
    });
    this.unsubscribe.next()
    this.unsubscribe.complete()
    let modal = this.modalCtrl.create("SelectPlayerPage");
    modal.onDidDismiss(()=>{
      this.unsubscribe=new Subject<void>()
      this.players=this.playerProv.getPlayers(this.unsubscribe)
    })
    modal.present()
  }
    

  

  openPlayer(player){

    let passParams={
      player: player
    };
    let modal = this.modalCtrl.create("CreatePlayerPage",passParams);
    modal.present();
  }

  createPlayer(){
    let id={
      player:-1
    };
    let modal = this.modalCtrl.create("CreatePlayerPage",id);
    modal.present();
  }


}
