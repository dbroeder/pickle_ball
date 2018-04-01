import { Injectable } from '@angular/core';

/*
  Generated class for the DoublesMatchesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoublesMatchesProvider {

  constructor() {
    console.log('Hello DoublesMatchesProvider Provider');
  }

  createDoublesGame(player1,player2,player3,player4, courtNum){
    return {
      buttonColor1: 'primary',
      buttonColor2: 'primary',
      court: courtNum,
      players: [player1,player2,player3,player4],
      reshuffle:true,
      sub_round:1

    }
  }

}
