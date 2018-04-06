import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


interface Players {
  name: string;
  displayName: string;
  rating: number;
  wins: number;
  roundsPlayed: number;
  winPercentage: number;
  isPlaying: boolean;
  _id: number;
  playedSingles:boolean;
  playedBye: boolean;
}

export interface Item { name: string; }

@Injectable()
export class PlayersProvider {

  playerCollection: AngularFirestoreCollection<Players>;
  players: Observable<Players[]>;
  constructor( public storage: Storage, private afs: AngularFirestore) {
    this.playerCollection = this.afs.collection('players');
    this.players = this.playerCollection.snapshotChanges().map(actions=>{
      return actions.map(a=>{
        let data = a.payload.doc.data() as Players;
        let $id = a.payload.doc.id;
        return  {$id,...data};
      })
    })
    console.log("Firebase players");
    console.log(this.players);
  }

  getPlayers(){
    return this.players;
  }

  addPlayer(player){
    this.playerCollection.add({
      name: player.name,
      displayName: player.displayName,
      rating: player.rating,
      wins: player.wins,
      roundsPlayed: player.roundsPlayed,
      winPercentage: player.winPercentage,
      isPlaying: player.isPlaying,
      _id: player._id,
      playedSingles:player.playedSingles,
      playedBye: player.playedBye
    }).then(result => {
      console.log("Document added with id >>> ", result.id);
    }).catch(error=>{
      console.error("Error adding document: ", error);
    })
  }

  updatePlayer(player){
    this.playerCollection.doc(player.$id).update({
      name: player.name,
      displayName: player.displayName,
      rating: player.rating,
      wins: player.wins,
      roundsPlayed: player.roundsPlayed,
      winPercentage: player.winPercentage,
      isPlaying: player.isPlaying,
      _id: player._id,
      playedSingles:player.playedSingles,
      playedBye: player.playedBye
    }).then(()=>{
      console.log("Document updated successfully");
    }).catch(error=>{
      console.error("Error updating document: ", error);
    })
  }
  
  deletePlayer(player){
    this.playerCollection.doc(player.$id).delete().then(()=>{
      console.log("Successfully Removed");
    }).catch((error)=>{
      console.error("Error removing player",error);
    })
  }

  get(dataBaseName: any) {
    
    console.log("Player Provider getting data from "+dataBaseName);
    return this.storage.get(dataBaseName).then((data) => {
      return data;
    });
  }
  set(storeTag:any,item: any){
    console.log("Setting value: "+item+" with key: "+storeTag);
    this.storage.set(storeTag,item);
  }


}
