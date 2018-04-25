import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AngularFirestore,AngularFirestoreCollection} from 'angularfire2/firestore'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {AuthorizorProvider} from '../authorizor/authorizor'


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

  
}

export interface Item { name: string; }

@Injectable()
export class PlayersProvider {
  user;
  playerCollection: AngularFirestoreCollection<Players>;
  players: Observable<Players[]>;
  constructor( public storage: Storage, private afs: AngularFirestore,public auth:AuthorizorProvider) {
    this.user=auth.getCurrentUser(); 
    
      this.playerCollection = this.afs.doc(`users/user${this.user.uid}`).collection('players'); 

    
    console.log("Firebase players");
    console.log(this.players);
  }

  createGame(name){
    this.afs.doc(`users/user${this.user.uid}`).update({
      groups: name.push(name)
    })
  }

  getGroups(){
    return this.afs.doc(`users/user${this.user.uid}`).snapshotChanges()
  }
  
  createUser(){
    this.afs.collection('users').doc(`user${this.user.uid}`).set({
      name:this.user.email,
      groups:[]
    }).then(()=>{
    }).catch((e)=>{
      console.error(e);
    })
  }

  getPlayers(filterProperty?, filterParam?){
    return this.playerCollection.snapshotChanges().map(actions=>{
      return actions.map(a=>{
        let data = a.payload.doc.data() as Players;
        let $id = a.payload.doc.id;
        return  {$id,...data};
      }).filter((item)=>{
        return item[filterProperty]==filterParam;
      })
    })
  }

  getRoundPlayers(round:string){
    return this.afs.doc(`users/user${this.user.uid}`).collection('players',(ref) =>{
      return ref.where('currentGame','==',round)
    }).snapshotChanges();
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
      userId: this.user.uid,
      playedSingles:player.playedSingles,
      playedBye: player.playedBye,
      groups:[],
      currentGame:''
    }).then(result => {
      console.log("Document added with id >>> ", result.id);
    }).catch(error=>{
      console.error("Error adding document: ", error);
    })
  }

  updatePlayer($id,updateProperty:object){
    console.log(updateProperty)
    this.playerCollection.doc($id).update(
      
      updateProperty 
    ).then(()=>{
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
