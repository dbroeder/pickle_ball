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
  $id:string;

  
}

export interface Item { name: string; }

@Injectable()
export class PlayersProvider {
  user;
  playerCollection: AngularFirestoreCollection<Players>;
  players: Observable<Players[]>;
  constructor( public storage: Storage, private afs: AngularFirestore,public auth:AuthorizorProvider) {
    this.user=auth.getCurrentUser();
      
  }

  playersFirstLoad(){
    this.playerCollection = this.afs.doc(`users/user${this.user.uid}`).collection('players'); 
      this.players=this.playerCollection.snapshotChanges().map(actions=>{
        return actions.map(a=>{
          let data = a.payload.doc.data() as Players;
          data.$id = a.payload.doc.id;
          return  {...data};
        })
      })
  }

  async checkExistingNames(name:String,id){
 
      let nameExists = false;
      await this.players.forEach(players=>{
        nameExists= players.some(player=>{
          console.log("help")
          return player.name==name;
        })
      })
      return nameExists
  }

  getNewUser(){
    this.user = this.auth.getCurrentUser()
    console.log("new user",this.user.uid)
  }



  batchWrite(functionToWrite:Function){
    var batch = this.afs.firestore.batch();
    this.afs.firestore.doc(`users/user${this.user.uid}`).collection('players').get().then((result)=>{
      result.forEach((doc)=>functionToWrite(doc))
    }).catch((e)=>{
      console.error(e);
    })
    batch.commit();

  }

  createGroup(name){
    const userRef = this.afs.firestore.doc(`users/user${this.user.uid}`)

    this.afs.firestore.runTransaction(transaction => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(userRef).then(doc => {
            if (!doc.data().groups) {
                transaction.set(userRef,{
                    groups: [name]
                });
            } else {
                const groups = doc.data().groups;
                groups.push(name);
                transaction.update(userRef, { groups: groups });
            }
        });
    }).then(function () {
        console.log("Transaction successfully committed!");
    }).catch(function (error) {
        console.log("Transaction failed: ", error);
    });
  }

  getGroups(){
    return this.afs.doc(`users/user${this.user.uid}`).snapshotChanges()
  }
  
  createUser(){
    this.user=this.auth.getCurrentUser()
    this.afs.collection('users').doc(`user${this.user.uid}`).set({
      name:this.user.email,
      groups:[]
    }).then(()=>{
    }).catch((e)=>{
      console.error(e);
    })
  }

  getPlayers(event ) {
    return this.players.takeUntil(event)
    
  }

  /*
  updateAll(updateProperty,property?,valueOnly?){
    this.getPlayers().forEach((players)=>{
      players.forEach((player)=>{
        if(player[property]==valueOnly){
          this.updatePlayer(player.$id,updateProperty);
        }else{
          this.updatePlayer(player.$id,updateProperty);
        }
        
      })
    })
  }
  */



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
      currentGame:'',
      $id: ''
    }).then(result => {
      this.updatePlayer(result.id,{$id:result.id})
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




}
