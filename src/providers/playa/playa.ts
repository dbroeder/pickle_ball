import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlayaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayaProvider {
 

  constructor() {
  }

  createPlayaByName(name,displayName,rating,id){
    return {
      name: name,
      displayName: displayName,
      rating: rating,
      wins: 0,
      roundsPlayed: 0,
      winPercentage: 0,
      isPlaying: false,
      _id: id,
      playedBye: false,
      playedSingles: false
    }

  }

  createPlayaByID(num){
    return {
      wins: 0,
      winPerc: 0,
      _id: num,
      playedBye: false,
      playedSingles: false,
      roundsPlayed: 0
    }
  }

}
