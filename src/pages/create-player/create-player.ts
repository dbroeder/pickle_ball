import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { PlayersProvider } from '../../providers/players/players';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@Component({
  selector: 'page-create-player',
  templateUrl: 'create-player.html',
})
export class CreatePlayerPage {

  player;
  editPlayerBool = false;
  name;
  displayName;
  rating;
  playerList = [];
  totalPlayerNumber;
  nameDupError = false;
  ratingError = false;
  dispNameError = false;
  createPlayerBool = false;
  oldPlayer;


  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public playerProv: PlayersProvider) {

    this.playerProv.get('players').then((val) => {
      this.playerList = val;
      if (this.player == -1 || this.player == undefined) {
        console.log('new player');
        this.createPlayerBool = true;
      } else {
        this.editPlayerBool = true;

      }
    });
    this.playerProv.get('playerLength').then((val) => {
      this.totalPlayerNumber = val;
    });

    this.player = navParams.get('player');
    if (this.player != -1) {
      this.oldPlayer = navParams.get('player');
      this.displayName = this.player.displayName;
      this.name = this.player.name;
      this.rating = this.player.rating;
    }

  }

  getIndexOfId(player) {
    let id = -1;
    for (let i = 0; i < this.playerList.length; i++) {
      if (player._id == this.playerList[i]._id) {
        id = i;
      }
    }
    return id;
  }

  savePlayer() {
    console.log("Old Player Save Method");
    console.log(this.oldPlayer);
    console.log("Index of old player" + this.getIndexOfId(this.oldPlayer));
    console.log(this.player);
    this.player.name = this.name;
    this.player.rating = this.rating;
    this.player.displayName = this.displayName;
    if (this.checkErrors(this.player.name, this.player.id, this.player.displayName, this.player._id)) {
      this.playerList.splice(this.getIndexOfId(this.oldPlayer), 1, this.player);
      this.playerProv.set('players', this.playerList);
      this.viewCtrl.dismiss();
    }



  }

  ionViewDidLoad() {

  }

  goBack() {
    this.viewCtrl.dismiss();
  }

  checkErrors(name, num, dispName, id) {
    let unique = true;
    if (this.playerList != undefined) {
      for (let player of this.playerList) {
        if (player.name == name && player._id != id) {
          this.nameDupError = true;
          unique = false;
        }
      }
      if (dispName.length != 3) {
        this.dispNameError = true;
        unique = false;
      }
      if (num > 5 || num < 1) {
        this.ratingError = true;
        unique = false;
      }
      return unique;
    } else {
      return unique;
    }


  }

  createPlayer() {
    console.log(this.totalPlayerNumber);
    if (this.checkErrors(this.name, this.rating, this.displayName, -1)) {
      if (this.totalPlayerNumber != undefined) {
        let newPlayer = {
          name: this.name,
          displayName: this.displayName,
          rating: this.rating,
          wins: 0,
          roundsPlayed: 0,
          winPercentage: 0,
          isPlaying: false,
          _id: this.totalPlayerNumber + 1
        }
        this.playerList.push(newPlayer);
        this.playerProv.set('players', this.playerList);
        this.playerProv.set('playerLength', this.totalPlayerNumber + 1);
      } else {
        let newPlayer = {
          name: this.name,
          displayName: this.displayName,
          rating: this.rating,
          wins: 0,
          roundsPlayed: 0,
          winPercentage: 0,
          isPlaying: false,
          _id: 0
        }
        this.playerList = [];
        console.log(newPlayer);
        this.playerList.push(newPlayer);
        this.playerProv.set('players', this.playerList);
        this.playerProv.set('playerLength', '1');

      }

      this.viewCtrl.dismiss();
    }

  }

}