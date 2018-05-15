import { Component } from '@angular/core';
import {MatchesProvider} from '../../providers/matches/matches';
import { Platform, ViewController, AlertController, NavController, NavParams, ModalController } from 'ionic-angular';



@Component({
  selector: 'page-league-play',
  templateUrl: 'league-play.html',
})
export class LeaguePlayPage {

  playingPlayers=[];
  gameType;
  round_number = 1;
  doublesMatches;
  selectedButtons;
  matches =[];
  byeRound=false;
  byePlayer;
  singlesRound;
  singlesButton;



  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,
  public matchesProv: MatchesProvider, public alertCtrl:AlertController, public modalCtrl: ModalController,public viewCtrl:ViewController) {
   
    let backPressed = platform.registerBackButtonAction(() => {
      console.log("Rounds page back pressed");
      //this.reset();
      backPressed();
      
    },10);
  }
 
  ionViewDidLoad() {
    this.playingPlayers=this.navParams.get("playingPlayers");
    console.log("League Play Players")
    console.log(this.playingPlayers);
    this.gameType = this.navParams.get("gameType");
    console.log(this.gameType);
    
  }

  roundRobin() {
    if (this.gameType == 'singles') {
      let info = this.matchesProv.singlesRounds(this.playingPlayers);
      this.matches = info.matches;
      this.selectedButtons = info.selectedButtons;
      this.byePlayer = info.byePlayer;
      this.byeRound = info.byeRound;

    }
    else {
      if (this.round_number % 3 == 1) {
        let info = this.matchesProv.doublesRounds(this.playingPlayers);
        this.matches = info.matches;
        this.selectedButtons = info.selectedButtons;
        this.byePlayer = info.byePlayer;
        this.byeRound = info.byeRound;
        this.singlesRound = info.singlesRound;
        this.singlesButton = info.singlesButton;
      }
      else if (this.round_number % 3 === 2) {
        if (this.singlesRound) {
          for (let index = 0; index < this.matches.length - 1; index++) {
            let tempPlayers = this.matches[index].players;
            this.matches[index].players[1] = tempPlayers[2];
            this.matches[index].player[2] = tempPlayers[1];
          }
        } else {
          for (let index = 0; index < this.matches.length; index++) {
            let tempPlayers = this.matches[index].players;
            this.matches[index].players[1] = tempPlayers[2];
            this.matches[index].player[2] = tempPlayers[1];
          }
        }
      }
      else if (this.round_number % 3 == 0) {
        if (this.singlesRound) {
          for (let index = 0; index < this.matches.length - 1; index++) {
            let tempPlayers = this.matches[index].players;
            this.matches[index].players[3] = tempPlayers[1];
            this.matches[index].player[1] = tempPlayers[3];
          }
        } else {
          for (let index = 0; index < this.matches.length; index++) {
            let tempPlayers = this.matches[index].players;
            this.matches[index].players[3] = tempPlayers[1];
            this.matches[index].player[1] = tempPlayers[3];
          }
        }

      }
    }
  }
  /*

  winnerWinnerDoubles(cnum, bnum, plyr1, plyr2, plyr3, plyr4) {
    //handles when the button is pushed in doubles format
    if (this.doublesMatches[cnum - 1].buttonColor1 === 'primary' && this.doublesMatches[cnum - 1].buttonColor2 === 'primary') {
      if (bnum === 1) {
        this.doublesMatches[cnum - 1].buttonColor1 = 'secondary';
        this.selectedButtons[cnum - 1] = true;
       

      } else if (bnum === 2) {
        this.doublesMatches[cnum - 1].buttonColor2 = 'secondary';
        this.selectedButtons[cnum - 1] = true;
      
      }
      this.winners.push(plyr1);
      this.winners.push(plyr2);
      



    } else if (this.doublesMatches[cnum - 1].buttonColor1 === 'secondary' || this.doublesMatches[cnum - 1].buttonColor2 === 'secondary') {
      if (bnum === 1 && this.doublesMatches[cnum - 1].buttonColor2 === 'secondary' ) {
        console.log("scenario 1");
        this.doublesMatches[cnum - 1].buttonColor2 = 'primary';
        this.doublesMatches[cnum - 1].buttonColor1 = 'secondary';
        this.removePlayerFromList(plyr3);
        this.removePlayerFromList(plyr4);
        this.winners.push(plyr1);
        this.winners.push(plyr2);
        

      } else if (bnum === 2&& this.doublesMatches[cnum - 1].buttonColor1 === 'secondary') {
        console.log("scenario 2");
        this.doublesMatches[cnum - 1].buttonColor1 = 'primary';
        this.doublesMatches[cnum - 1].buttonColor2 = 'secondary';
        this.removePlayerFromList(plyr3);
        this.removePlayerFromList(plyr4);
        this.winners.push(plyr1);
        this.winners.push(plyr2);
        

      }else if(bnum==1 && this.doublesMatches[cnum - 1].buttonColor1 === 'secondary'){
        console.log("scenario 3");
        this.removePlayerFromList(plyr1);
        this.removePlayerFromList(plyr2);
        this.selectedButtons[cnum-1]=false;
        this.doublesMatches[cnum - 1].buttonColor1 = 'primary';
      }
      else{
        console.log("scenario 4");
        this.removePlayerFromList(plyr1);
        this.removePlayerFromList(plyr2);
        this.selectedButtons[cnum-1]=false;
        this.doublesMatches[cnum - 1].buttonColor2 = 'primary';
      }
      
      
      

    }

  }

  removePlayerFromList(player){
    let val = this.getIndexOfId(player,this.winners);
      if (val != -1) {
        this.winners.splice(val,1);
       
      };
  }

  winnerWinnerSingles(num, bnum, plyr1, plyr2) {
    //handles when the singles button is pushed
    if (this.singlesFormat) {
      if (this.singlesMatches[num - 1].buttonColor1 === 'primary' && this.singlesMatches[num - 1].buttonColor2 === 'primary') {
        if (bnum === 1) {
          this.singlesMatches[num - 1].buttonColor1 = 'secondary';
          this.selectedButtons[num - 1] = true;

        } else if (bnum === 2) {
          this.singlesMatches[num - 1].buttonColor2 = 'secondary';
          this.selectedButtons[num - 1] = true;
        }
        this.winners.push(plyr1);
        console.log("winners");
        console.log(this.winners);
       



      } else if (this.singlesMatches[num - 1].buttonColor1 === 'secondary' || this.singlesMatches[num - 1].buttonColor2 === 'secondary') {
        if (bnum === 1 && this.singlesMatches[num - 1].buttonColor2 === 'secondary' ) {
          console.log("scenario 1");
          this.singlesMatches[num - 1].buttonColor2 = 'primary';
          this.singlesMatches[num - 1].buttonColor1 = 'secondary';
          this.removePlayerFromList(plyr2);
          this.winners.push(plyr1);
          console.log("winners");
          console.log(this.winners);
  
        } else if (bnum === 2&& this.singlesMatches[num - 1].buttonColor1 === 'secondary') {
          console.log("scenario 2");
          this.singlesMatches[num - 1].buttonColor1 = 'primary';
          this.singlesMatches[num - 1].buttonColor2 = 'secondary';
          this.removePlayerFromList(plyr2);
          this.winners.push(plyr1);
          console.log("winners");
          console.log(this.winners)
  
        }else if(bnum==1 && this.singlesMatches[num - 1].buttonColor1 === 'secondary'){
          console.log("scenario 3");
          this.removePlayerFromList(plyr1);
          this.selectedButtons[num-1]=false;
          this.singlesMatches[num - 1].buttonColor1 = 'primary';
        }
        else{
          console.log("scenario 4");
          this.removePlayerFromList(plyr1);
          this.selectedButtons[num-1]=false;
          this.singlesMatches[num - 1].buttonColor2 = 'primary';
        }


      }
    } else {
      if (this.sbuttonColor1 === 'primary' && this.sbuttonColor2 === 'primary') {
        if (bnum === 1) {
          this.sbuttonColor1 = 'secondary';
        } else if (bnum === 2) {
          this.sbuttonColor2 = 'secondary';
        }
        this.singlesWinner = plyr1;
        

        this.singlesButton = true;


      } else if (this.sbuttonColor1 === 'secondary' || this.sbuttonColor2 === 'secondary') {
        if (bnum === 1&&this.sbuttonColor2 === 'secondary') {
          this.sbuttonColor2 = 'primary';
          this.sbuttonColor1="secondary";
          this.singlesWinner=plyr1;
        } else if (bnum === 2&&this.sbuttonColor1 === 'secondary') {
          this.sbuttonColor1 = 'primary';
          this.sbuttonColor2="secondary";
          this.singlesWinner=plyr1;
        }else if(bnum === 2&&this.sbuttonColor2 === 'secondary'){
          this.singlesButton = false;
          this.sbuttonColor2='primary';
          this.singlesWinner = new Playa(0);
        }else{
          this.singlesButton = false;
          this.sbuttonColor1='primary';
          this.singlesWinner = new Playa(0);
        }
        

      }
    }


  }

  getIndexOfId(player,list) {
    //gets the specific index of a player in an array

      let id = -1;
      for (let i = 0; i < list.length; i++) {
        if (player._id == list[i]._id) {
          id = i;
        }
      }
      return id;
  }

  competeButton() {
    //handles when the competitive button is pressed
    if (this.competetiveRound == false) {
      let alert = this.alertCtrl.create({
        title: 'Continue?',
        message: 'Once you set the competitve matchups, every round afterwards will be based on ranking. No more random rounds. Would you like to proceed?',
        buttons: [
          {
            text: 'yes',
            handler: () => {
              this.competitiveText = 'Next Round';
              this.competetiveRound = true;
              this.competeShuff();
            }
          },
          {
            text: 'no',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
    }
    else if (this.buttonSelected() == false) {
      let alert = this.alertCtrl.create({
        title: 'Select a Winner',
        subTitle: 'You need to select a winner of at least one round to proceed to another round.',
        buttons: ['ok']
      });
      alert.present();
    }
    else {
      this.competeShuff();
    }
  }


  competeShuff() {
    //shuffles players based on win percentage
    if (this.buttonSelected()) {
      this.re_align_Players();
      this.rounds++;
    }
    this.winners = [];
    this.singleGame = undefined;
    this.singlesMatches = [];
    this.doublesMatches = [];
    this.picklePlayers.sort(function (a, b) {
      if ((((b.winPerc) - (a.winPerc)) == 0)) {
        if (((a.roundsPlayed) - (b.roundsPlayed)) == 0) {
          return (a._id) - (b._id);
        } else {
          return (b.roundsPlayed) - (a.roundsPlayed);
        }

      }
      else {
        return (b.winPerc) - (a.winPerc);
      }
    });
    console.log(this.picklePlayers);
    if (this.doublesFormat) {
      this.doublesMatches = [];
      this.selectedButtons = [];
      this.singlesButton = false;
      if (this.picklePlayers.length % 4 === 0) {
        this.byeRound = false;
        this.singlesRound = false;
        for (var index = 0; index < this.picklePlayers.length; index += 4) {
          this.selectedButtons.push(false);
          this.doublesMatches.push(new DoublesGame(this.picklePlayers[index], this.picklePlayers[index + 3], this.picklePlayers[index + 2], this.picklePlayers[index + 1], index / 4 + 1))
        }
      } else if (this.picklePlayers.length % 4 === 1) {
        this.byeRound = true;
        this.singlesRound = false;

        for (var dex = 0; dex < this.picklePlayers.length - 1; dex += 4) {
          this.selectedButtons.push(false);
          this.doublesMatches.push(new DoublesGame(this.picklePlayers[dex], this.picklePlayers[dex + 3], this.picklePlayers[dex + 2], this.picklePlayers[dex + 1], dex / 4 + 1))
        }
        this.byePlayer = this.picklePlayers[this.picklePlayers.length - 1];

      }
      else if (this.picklePlayers.length % 4 === 3) {

        this.byePlayer = this.picklePlayers[this.picklePlayers.length - 1];

        var player1 = this.picklePlayers[this.picklePlayers.length - 2];

        var player2 = this.picklePlayers[this.picklePlayers.length - 3];

        var court = Math.floor(this.picklePlayers.length / 4) + 1;
        this.singleGame = new SingleGame(player1, player2, court);
        this.sbuttonColor1 = 'primary';
        this.sbuttonColor2 = 'primary';

        this.byeRound = true;
        this.singlesRound = true;
        for (var index1 = 0; index1 < this.picklePlayers.length - 3; index1 += 4) {
          this.selectedButtons.push(false);
          this.doublesMatches.push(new DoublesGame(this.picklePlayers[index1], this.picklePlayers[index1 + 3], this.picklePlayers[index1 + 2], this.picklePlayers[index1 + 1], index1 / 4 + 1))
        }
      }
      else {
        this.byeRound = false;
        this.singlesRound = true;
        this.sbuttonColor1 = 'primary';
        this.sbuttonColor2 = 'primary';
        var player11 = this.picklePlayers[this.picklePlayers.length - 1];
        var player22 = this.picklePlayers[this.picklePlayers.length - 2];

        var court1 = Math.floor(this.picklePlayers.length / 4) + 1;
        this.singleGame = new SingleGame(player11, player22, court1);
        for (var index2 = 0; index2 < this.picklePlayers.length - 2; index2 += 4) {
          this.selectedButtons.push(false);
          this.doublesMatches.push(new DoublesGame(this.picklePlayers[index2], this.picklePlayers[index2 + 3], this.picklePlayers[index2 + 2], this.picklePlayers[index2 + 1], index2 / 4 + 1))
        }
      }

      
    } else if (this.singlesFormat) {
      this.singlesMatches = [];
      this.selectedButtons = [];
      if (this.picklePlayers.length % 2 == 0) {
        this.byeRound = false;
        for (let index = 0; index < this.picklePlayers.length; index += 2) {
          this.singlesMatches.push(new SingleGame(this.picklePlayers[index], this.picklePlayers[index + 1], index / 2 + 1));
          this.selectedButtons.push(false);
        }
      }
      else if (this.picklePlayers.length % 2 == 1) {
        this.byeRound = true;
        this.byePlayer = this.picklePlayers[this.picklePlayers.length - 1];
        for (let index = 0; index < this.picklePlayers.length - 1; index += 2) {
          this.singlesMatches.push(new SingleGame(this.picklePlayers[index], this.picklePlayers[index + 1], index / 2 + 1));
          this.selectedButtons.push(false);
        }
      }
    }



  }
  */

  reset() {
    //handles when the quit button is pressed
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: "Are you sure you want to quit this game? You will lose all your progress.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let data: number;
            this.viewCtrl.dismiss()
          }
        }
      ]
    });
    alert.present();

  }
  /*

  randomList(num) {
    //randomizes player list for random rounds
    let m = num - 1;
    for (var index = 0; index < num; index++) {
      let rn = Math.floor(Math.random() * m);
      while (this.picklePlayers[index]._id === this.picklePlayers[rn]._id) {
        rn = Math.floor(Math.random() * m);
      }
      let i = this.picklePlayers[index];
      this.picklePlayers[index] = this.picklePlayers[rn];
      this.picklePlayers[rn] = i;

    }
  }

  buttonSelected() {
    //checks to see if a player matchup has been selected
    var bool = false;
    for (let val of this.selectedButtons) {
      if (val == true) {
        bool = true;
      }
    }
    if (this.singlesButton == true) {
      bool = true;
    }
    return bool;
  }


  nextRound() {
    //handles the next button 
    if (this.buttonSelected() === true && this.competetiveRound == false) {
      this.re_align_Players();
      this.rounds++;
      console.log(this.picklePlayers);

      this.refresh();

      
      this.winners = [];
      this.singlesWinner = new Playa(0);
    } else if (this.competetiveRound == true) {
      let alert = this.alertCtrl.create({
        title: 'Competetive Round',
        subTitle: 'You can no longer use the random round because the competitve rounds have started.',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Select Winners',
        subTitle: 'Make sure at least one round has a selected winner.',
        buttons: ['Ok']
      });
      alert.present();
    }

  }

  re_align_Players() {
    //gives wins to players 
    for (var index = 0; index < this.picklePlayers.length; index++) {
      for (var dex = 0; dex < this.winners.length; dex++) {
        if (this.winners[dex]._id == this.picklePlayers[index]._id) {
          this.picklePlayers[index].wins++;
        }
      }
      if (this.singlesWinner !== undefined || this.singlesWinner._id != 0) {
        if (this.singlesWinner._id == this.picklePlayers[index]._id) {
          this.picklePlayers[index].wins++;
        }
      }
    }
    //adds rounds to players who participated (doubles)
    console.log("Selected Buttons from re-align players");
    console.log(this.selectedButtons);
    for (var idex = 0; idex < this.doublesMatches.length; idex++) {

      for (var dd = 0; dd < 4; dd++) {
        if (this.selectedButtons[idex] == true) {
          this.doublesMatches[idex].players[dd].roundsPlayed++;
        }
        for (var num = 0; num < this.picklePlayers.length; num++) {
          if (this.picklePlayers[num]._id == this.doublesMatches[idex].players[dd]._id) {
            this.picklePlayers[num] = this.doublesMatches[idex].players[dd];
          }
        }
      }

    }
    //adds rounds to players who participated (singles)
    for (let idex = 0; idex < this.singlesMatches.length; idex++) {
      if (this.selectedButtons[idex] == true) {
        this.singlesMatches[idex].player1.roundsPlayed++;
        this.singlesMatches[idex].player2.roundsPlayed++;
      }
      for (let num = 0; num < this.picklePlayers.length; num++) {
        if (this.picklePlayers[num]._id == this.singlesMatches[idex].player1._id) {
          this.picklePlayers[num] = this.singlesMatches[idex].player1;
        }
        if (this.picklePlayers[num]._id == this.singlesMatches[idex].player2._id) {
          this.picklePlayers[num] = this.singlesMatches[idex].player2;
        }
      }
    }
    var count = 0;
    //matches up players in leftover singles from doubles rounds.
    if (this.singleGame !== undefined) {
      while (this.singleGame.player1._id !== this.picklePlayers[count]._id) {
        count++;
      }
      this.picklePlayers[count] = this.singleGame.player1;
      if(this.singlesWinner._id!=0){
        this.picklePlayers[count].roundsPlayed++;
      }
      
      this.picklePlayers[count].playedSingles = true;
      count = 0;
      while (this.singleGame.player2._id !== this.picklePlayers[count]._id) {
        count++;
      }
      this.picklePlayers[count] = this.singleGame.player2;
      if(this.singlesWinner._id!=0){
        this.picklePlayers[count].roundsPlayed++;
      }
      this.picklePlayers[count].playedSingles = true;
    }
    //sets bye round as having been played
    if (this.byeRound == true) {
      for (var bb = 0; bb < this.picklePlayers.length; bb++) {
        if (this.byePlayer._id == this.picklePlayers[bb]._id) {
          this.picklePlayers[bb].playedBye = true;
        }
      }
    }
    //calculate win percentage
    for (let player of this.picklePlayers) {
      if (player.roundsPlayed > 0) {
        player.winPerc = Math.ceil(player.wins / player.roundsPlayed * 100);
      } else {
        player.winPerc = "0";
      }
    }

  }

  addPlayer() {
    //adds a player when someone shows up mid round
    if (this.buttonSelected() == true) {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot add player once a winner has been selected for the round. Desselect the winner or procede to next round to add player.',
        buttons: ['ok']
      });
      alert.present();
    } else {
      var newPlayerNum = 0;
      for (var dex = 0; dex < this.picklePlayers.length; dex++) {
        if (this.picklePlayers[dex]._id > newPlayerNum) {
          newPlayerNum = this.picklePlayers[dex]._id;
        }
      }
      this.picklePlayers.push(new Playa(newPlayerNum + 1));
      if (this.competetiveRound) {
        this.competeShuff();
      } else {
        this.refresh();
      }

    }
  }

  remove() {
    //removes a player. is called when minus button is pushed
    if (this.buttonSelected() == true) {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot remove player once a winner has been selected for the round. Desselect the winner(s) or procede to next round to remove player.',
        buttons: ['ok']
      });
      alert.present();
    } else {

      let greatest_id = 0;
      for (let player of this.picklePlayers) {
        if (player._id > greatest_id) {
          greatest_id = player._id;
        }
      }
      let remove = this.modalCtrl.create(RemovePlayerPage, { totalPlayerNums: greatest_id });
      remove.onDidDismiss(data => {
        var checkNums = data;
        if (checkNums !== undefined) {

          var num = -1;
          for (var dex = 0; dex < this.picklePlayers.length; dex++) {
            if (this.picklePlayers[dex]._id == checkNums) {
              num = dex;
            }
          }
          if (num == -1) {
            let alert = this.alertCtrl.create({
              title: "Player Mixup",
              subTitle: "Oops I think you alread deleted this player. Try again",
              buttons: ['ok']
            });
            alert.present();
          } else if (this.competetiveRound == true) {
            this.picklePlayers.splice(num, 1);
            this.competeShuff();
          } else {
            this.picklePlayers.splice(num, 1);
            this.refresh();
          }

        }
      });
      remove.present();
    }
  }

  refresh() {
    //re-organizes matchups
    this.randomList(this.picklePlayers.length);
    this.matchups();
  }

  refreshButton() {
    //called when refresh button is pressed
    if (this.buttonSelected() == true) {
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot refresh once a winner has been selected for the round. Desselect the winner or procede to next round to reshuffle.',
        buttons: ['ok']
      });
      alert.present();
    } else if (this.competetiveRound == true) {
      let alert = this.alertCtrl.create({
        title: "Not This Time",
        subTitle: "Sorry you cannot shuffle a competitive round.",
        buttons: ['ok']
      });
      alert.present();
    } else {
      this.refresh();
    }
  }

  results() {
    //called when results button is pressed
    if (this.rounds < 2) {
      let alert = this.alertCtrl.create({
        title: "Too Early",
        subTitle: 'There are not enough rounds to show results. Please try again after playing a round or two.',
        buttons: ['ok']
      });
      alert.present();
    } else if (this.buttonSelected() == true) {
      let alert = this.alertCtrl.create({
        title: 'Not Right Now',
        subTitle: 'Looks like someone already won a game. Go to the next round to view results.',
        buttons: ['ok']
      });
      alert.present();
    } else {
      let realSpots = this.picklePlayers;

      let players = {
        players: realSpots.sort(function (a, b) {
          if ((((b.winPerc) - (a.winPerc)) == 0)) {
            if (((a.roundsPlayed) - (b.roundsPlayed)) == 0) {
              return (a._id) - (b._id);
            } else {
              return (b.roundsPlayed) - (a.roundsPlayed);
            }

          }
          else {
            return (b.winPerc) - (a.winPerc);
          }
        })
      };
      this.navCtrl.push(ResultsPage, players);
    }

  }

}
*/



}
