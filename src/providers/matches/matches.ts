import { Injectable } from '@angular/core';
import {PlayaProvider} from '../playa/playa';
import {SinglesMatchesProvider} from '../singles-matches/singles-matches';
import {DoublesMatchesProvider} from '../doubles-matches/doubles-matches';


@Injectable()
export class MatchesProvider {

  matches = [];

  constructor(public playa: PlayaProvider,public singlesGame:SinglesMatchesProvider,public doublesGame:DoublesMatchesProvider) {
    console.log('Hello MatchesProvider Provider');
  }

  singlesRounds(picklePlayers) {
    //Used for singles format matchups
    let byeRound=false;
    let byePlayer;
    let matches = [];
    let selectedButtons = [];
    //if even number then set up matches
    if (picklePlayers.length % 2 == 0) {
      for (var index = 0; index < picklePlayers.length; index += 2) {
        selectedButtons.push(false);
        matches.push(this.singlesGame.createSingleGame(picklePlayers[index], picklePlayers[index + 1], index / 2 + 1))
      }

    }
    //if odd number assisgns players a bye round
    else {
      this.allHaveHadByes(picklePlayers);
      byeRound = true;
      while (picklePlayers[picklePlayers.length - 1].playedBye) {
        picklePlayers = this.randomList(picklePlayers.length,picklePlayers);
      }
      for (let index = 0; index < picklePlayers.length - 1; index += 2) {
        selectedButtons.push(false);
        matches.push(this.singlesGame.createSingleGame(picklePlayers[index], picklePlayers[index + 1], index / 2 + 1))
      }
      byePlayer = picklePlayers[picklePlayers.length - 1];
    }
    console.log(matches.length);
    return {
      matches,
      byeRound,
      byePlayer,
      selectedButtons
    }
  }

  doublesRounds(picklePlayers) {
    //sets up matchups for each round
    let byeRound=false;
    let byePlayer;
    let singlesRound=false;
      let matches = [];
      let selectedButtons = [];
      let singlesButton = false;
      let singleGame=undefined;
      if (picklePlayers.length % 4 === 0) {
        byeRound = false;
        singlesRound = false;
        for (var index = 0; index < picklePlayers.length; index += 4) {
          selectedButtons.push(false);
          matches.push(this.doublesGame.createDoublesGame(picklePlayers[index], picklePlayers[index + 1], picklePlayers[index + 2], picklePlayers[index + 3], index / 4 + 1))
        }
      } else if (picklePlayers.length % 4 === 1) {
        byeRound = true;
        singlesRound = false;
        this.allHaveHadByes(picklePlayers);
        while (picklePlayers[picklePlayers.length - 1].playedBye) {
          this.randomList(picklePlayers.length,picklePlayers);
        }
        for (var dex = 0; dex < picklePlayers.length - 1; dex += 4) {
          selectedButtons.push(false);
          matches.push(this.doublesGame.createDoublesGame(picklePlayers[dex], picklePlayers[dex + 1], picklePlayers[dex + 2], picklePlayers[dex + 3], dex / 4 + 1))
        }
        byePlayer = picklePlayers[picklePlayers.length - 1];
      }
      else if (picklePlayers.length % 4 === 3) {
        this.allHaveHadByes(picklePlayers);
        while (picklePlayers[picklePlayers.length - 1].playedBye) {
          picklePlayers=this.randomList(picklePlayers.length,picklePlayers);
        }
        byePlayer = picklePlayers[picklePlayers.length - 1];
        this.allHavePlayedSingles(picklePlayers);
        while (picklePlayers[picklePlayers.length - 2].playedSingles) {
          picklePlayers =this.randomList(picklePlayers.length - 1,picklePlayers);
        }
        var player1 = picklePlayers[picklePlayers.length - 2];
        while (picklePlayers[picklePlayers.length - 3].playedSingles) {
          picklePlayers = this.randomList(picklePlayers.length - 2,picklePlayers);
        }
        var player2 = picklePlayers[picklePlayers.length - 3];
        var court = Math.floor(picklePlayers.length / 4) + 1;
        singleGame = this.singlesGame.createSingleGame(player1, player2, court);
        matches.push(singleGame);
        byeRound = true;
        singlesRound = true;
        for (var index1 = 0; index1 < picklePlayers.length - 3; index1 += 4) {
          selectedButtons.push(false);
          matches.push(this.doublesGame.createDoublesGame(picklePlayers[index1], picklePlayers[index1 + 1], picklePlayers[index1 + 2], picklePlayers[index1 + 3], index1 / 4 + 1))
        }
      }
      else {
        byeRound = false;
        singlesRound = true;
        this.allHavePlayedSingles(picklePlayers);
        while (picklePlayers[picklePlayers.length - 1].playedSingles) {
          picklePlayers = this.randomList(picklePlayers.length,picklePlayers);
        }
        var player11 = picklePlayers[picklePlayers.length - 1];
        while (picklePlayers[picklePlayers.length - 2].playedSingles) {
          picklePlayers = this.randomList(picklePlayers.length - 1,picklePlayers);
        }
        var player22 = picklePlayers[picklePlayers.length - 2];

        var court1 = Math.floor(picklePlayers.length / 4) + 1;
        singleGame = this.singlesGame.createSingleGame(player11, player22, court1);
        matches.push(singleGame);
        for (var index2 = 0; index2 < picklePlayers.length - 2; index2 += 4) {
          selectedButtons.push(false);
          matches.push(this.doublesGame.createDoublesGame(picklePlayers[index2], picklePlayers[index2 + 1], picklePlayers[index2 + 2], picklePlayers[index2 + 3], index2 / 4 + 1))
        }
      }
      
      return {
        matches,
        byeRound,
        byePlayer,
        selectedButtons,
        singlesRound,
        singlesButton
      }
    

  }

  allHavePlayedSingles(picklePlayers) {
    //only used for doubles format. ensures 1 player doesn't get repeatedly stuck in the singles bracket
    var count = 0;
    for (var index = 0; index < picklePlayers.length; index++) {
      if (picklePlayers[index].playedSingles === false) {
        count++;
      }
    }
    if (count < 2) {
      for (var dex = 0; dex < picklePlayers.length; dex++) {
        picklePlayers[dex].playedSingles = false;
      }
    }
  }

  allHaveHadByes(picklePlayers) {
    //ensures all players have had a bye before repeating
    var allPlayed = true;
    for (var index = 0; index < picklePlayers.length; index++) {
      if (picklePlayers[index].playedBye === false) {
        allPlayed = false;
      }
    }
    if (allPlayed === true) {
      for (var dex = 0; dex < picklePlayers.length; dex++) {
        picklePlayers[dex].playedBye = false;
      }
    }
  }

  randomList(num,picklePlayers) {
    //randomizes player list for random rounds
    let m = num - 1;
    for (var index = 0; index < num; index++) {
      let rn = Math.floor(Math.random() * m);
      while (picklePlayers[index]._id === picklePlayers[rn]._id) {
        rn = Math.floor(Math.random() * m);
      }
      let i = picklePlayers[index];
      picklePlayers[index] = picklePlayers[rn];
      picklePlayers[rn] = i;

    }
    return picklePlayers;
  }

}
