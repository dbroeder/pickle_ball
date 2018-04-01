import { Injectable } from '@angular/core';
import {PlayaProvider} from '../playa/playa';

/*
  Generated class for the SinglesMatchesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SinglesMatchesProvider {

  constructor(public playa: PlayaProvider) {
    
  } 

  createSingleGame(courtNum, player1,player2){
    return {
      court: courtNum,
      player1: player1,
      player2: player2,
      buttonColor1: 'primary',
      buttonColor2: 'primary',
    }
  }

}
