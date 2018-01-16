import { Component } from '@angular/core';
import { ViewController,AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {RemovePlayerPage} from '../remove-player/remove-player';
import{ResultsPage} from '../results/results';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@IonicPage()
@Component({
  selector: 'page-rounds',
  templateUrl: 'rounds.html',
})
export class RoundsPage {
  playerNumber:number;
  picklePlayers = [];
  matches = [];
  in=true;
  singles=false;
  singleGame:SingleGame;
  byeRound=false;
  byePlayer:Playa;
  buttonColor=[];
  sbuttonColor1='primary';
  sbuttonColor2='primary';
  rounds=1;
  error=false;
  singlesWinner:Playa;
  doublesWinners=[];
  nextButton=false;
  competitveButton=false;

  constructor(public viewCtrl: ViewController,public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    this.playerNumber=this.navParams.get('number');
    console.log(this.playerNumber);
    this.picklePlayers=[];
    for(var person=1; person<=this.playerNumber;person++){
      this.picklePlayers.push(new Playa(person));
    }
    this.refresh();
  }

  allHaveHadByes(){
    var allPlayed=true;
    for(var index=0;index<this.picklePlayers.length;index++){
      if(this.picklePlayers[index].bye===false){
        allPlayed=false;
      }
    }
    if(allPlayed===true){
      for(var index=0;index<this.picklePlayers.length;index++)
      {
        this.picklePlayers[index].bye=false;
      }
    }
  }

  allHavePlayedSingles(){
    var count=0;
    for(var index=0;index<this.picklePlayers.length;index++){
      if(this.picklePlayers[index].singles===false){
        count++;
      }
    }
    if(count<2){
      for(var index=0;index<this.picklePlayers.length;index++)
      {
        this.picklePlayers[index].singles=false;
      }
    }
  }

  matchups(){
    console.log(this.picklePlayers);
    this.matches=[];
    if(this.picklePlayers.length%4===0){
      this.byeRound=false;
      this.singles=false;
      for(var index=0;index<this.picklePlayers.length;index+=4){
        this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
      }
    }else if(this.picklePlayers.length%4===1){
      this.byeRound=true;
      this.singles=false;
      this.allHaveHadByes();
      while(this.picklePlayers[this.picklePlayers.length-1].bye){
        this.randomList(this.picklePlayers.length);
      }
      for(var index=0;index<this.picklePlayers.length-1;index+=4){
        this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
      }
      this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
    }
    else if(this.picklePlayers.length%4===3){
      this.allHaveHadByes();
      while(this.picklePlayers[this.picklePlayers.length-1].bye){
        this.randomList(this.picklePlayers.length);
      }
      this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
      this.allHavePlayedSingles();
      while(this.picklePlayers[this.picklePlayers.length-2].singles){
        this.randomList(this.picklePlayers.length-1);
      }
      var player1=this.picklePlayers[this.picklePlayers.length-2];
      while(this.picklePlayers[this.picklePlayers.length-3].singles){
        this.randomList(this.picklePlayers.length-2);
      }
      var player2=this.picklePlayers[this.picklePlayers.length-3];
     
      var court=Math.floor(this.picklePlayers.length/4)+1;
      this.singleGame=new SingleGame(player1,player2,court);
      this.sbuttonColor1='primary';
      this.sbuttonColor2='primary';
     
      this.byeRound=true;
      this.singles=true;
      for(var index=0;index<this.picklePlayers.length-3;index+=4){
        this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
      }
    }
    else{
      this.byeRound=false;
      this.singles=true;
      this.allHavePlayedSingles();
      while(this.picklePlayers[this.picklePlayers.length-1].singles){
        this.randomList(this.picklePlayers.length);
      }
      this.sbuttonColor1='primary';
      this.sbuttonColor2='primary';
      var player1=this.picklePlayers[this.picklePlayers.length-1];
      while(this.picklePlayers[this.picklePlayers.length-2].singles){
        this.randomList(this.picklePlayers.length-1);
      }
      var player2=this.picklePlayers[this.picklePlayers.length-2];
     
      var court=Math.floor(this.picklePlayers.length/4)+1;
      this.singleGame=new SingleGame(player1,player2,court);
      for(var index=0;index<this.picklePlayers.length-2;index+=4){
        this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
      }
    }
    
  }

  winnerWinnerDoubles(cnum,bnum,plyr1,plyr2,plyr3,plyr4){
    if(this.matches[cnum-1].buttonColor1==='primary'&&this.matches[cnum-1].buttonColor2==='primary'){
      if(bnum===1)
      {
        this.matches[cnum-1].buttonColor1='secondary';
        
        
      }else if(bnum===2){
        this.matches[cnum-1].buttonColor2='secondary';
        
      }
      this.doublesWinners.push(plyr1);
      this.doublesWinners.push(plyr2);
      this.in=false;
      this.nextButton=true;
      this.competitveButton=true;

      
    }else if(this.matches[cnum-1].buttonColor1==='secondary'||this.matches[cnum-1].buttonColor2==='secondary'){
      if(bnum===1){
        this.matches[cnum-1].buttonColor1='primary';
       
      }else if(bnum===2){
        this.matches[cnum-1].buttonColor2='primary';
        
      }
      this.in=true;
      this.doublesWinners.splice(plyr1);
      this.doublesWinners.splice(plyr2);
      
    }

  }

  winnerWinnerSingles(num,plyr1,plyr2){
    if(this.sbuttonColor1==='primary'&&this.sbuttonColor2==='primary'){
      if(num===1)
      {
        this.sbuttonColor1='secondary';
      }else if(num===2){
        this.sbuttonColor2='secondary';
      }
      this.singlesWinner=plyr1;
      this.in=false;
      this.nextButton=true;
      this.competitveButton=true;

      
    }else if(this.sbuttonColor1==='secondary'||this.sbuttonColor2==='secondary'){
      if(num===1)
      {
        this.sbuttonColor1='primary';
      }else if(num===2){
        this.sbuttonColor2='primary';
      }
      this.in=true;
      
    }

  }

  
  

  competeShuff(){
    if(this.competitveButton===true){
      this.postGame();
      console.log(this.rounds);
      let round=this.rounds;
      this.picklePlayers.sort(function(a,b){
        return (b.wins)/(round)-(a.wins)/(round);
      });
      console.log(this.picklePlayers);
      this.rounds++;
      
      this.matches=[];
      if(this.picklePlayers.length%4===0){
        this.byeRound=false;
        this.singles=false;
        for(var index=0;index<this.picklePlayers.length;index+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+3],this.picklePlayers[index+2],this.picklePlayers[index+1],index/4+1))
        }
      }else if(this.picklePlayers.length%4===1){
        this.byeRound=true;
        this.singles=false;
        this.allHaveHadByes();
        while(this.picklePlayers[this.picklePlayers.length-1].bye){
          this.randomList(this.picklePlayers.length);
        }
        for(var index=0;index<this.picklePlayers.length-1;index+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
        }
        this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
        this.picklePlayers[this.picklePlayers.length-1].bye=true;
      }
      else if(this.picklePlayers.length%4===3){
        this.allHaveHadByes();
        while(this.picklePlayers[this.picklePlayers.length-1].bye){
          this.randomList(this.picklePlayers.length);
        }
        this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
        this.picklePlayers[this.picklePlayers.length-1].bye=true;
        this.allHavePlayedSingles();
        while(this.picklePlayers[this.picklePlayers.length-2].singles){
          this.randomList(this.picklePlayers.length-1);
        }
        this.picklePlayers[this.picklePlayers.length-2].singles=true;
        var player1=this.picklePlayers[this.picklePlayers.length-2];
        while(this.picklePlayers[this.picklePlayers.length-3].singles){
          this.randomList(this.picklePlayers.length-2);
        }
        this.picklePlayers[this.picklePlayers.length-3].singles=true;
        var player2=this.picklePlayers[this.picklePlayers.length-3];
       
        var court=Math.floor(this.picklePlayers.length/4)+1;
        this.singleGame=new SingleGame(player1,player2,court);
        this.sbuttonColor1='primary';
        this.sbuttonColor2='primary';
       
        this.byeRound=true;
        this.singles=true;
        for(var index=0;index<this.picklePlayers.length-3;index+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
        }
      }
      else{
        this.byeRound=false;
        this.singles=true;
        this.allHavePlayedSingles();
        while(this.picklePlayers[this.picklePlayers.length-1].singles){
          this.randomList(this.picklePlayers.length);
        }
        this.sbuttonColor1='primary';
        this.sbuttonColor2='primary';
        this.picklePlayers[this.picklePlayers.length-1].singles=true;
        var player1=this.picklePlayers[this.picklePlayers.length-1];
        while(this.picklePlayers[this.picklePlayers.length-2].singles){
          this.randomList(this.picklePlayers.length-1);
        }
        this.picklePlayers[this.picklePlayers.length-2].singles=true;
        var player2=this.picklePlayers[this.picklePlayers.length-2];
       
        var court=Math.floor(this.picklePlayers.length/4)+1;
        this.singleGame=new SingleGame(player1,player2,court);
        for(var index=0;index<this.picklePlayers.length-2;index+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
        }
      }
      this.nextButton=false;
      this.competitveButton=false;
      this.in=true;
    }else{
      let alert = this.alertCtrl.create({
        title: 'Select Winners',
        subTitle: 'Make sure at least one round has a selected winner.',
        buttons: ['Ok']
      });
      alert.present();
    }
    
  }

  reset(){
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: "Are you sure you want to quit this game? You will lose all your progress.",
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
    
  }

  randomList(num){
    let m=num;
    for(var index=0;index<num;index++){
      let rn = Math.floor(Math.random()*m);
      while(this.picklePlayers[index].id===this.picklePlayers[rn].id){
        rn = Math.floor(Math.random()*m);
      }
      let i = this.picklePlayers[index];
      this.picklePlayers[index]=this.picklePlayers[rn];
      this.picklePlayers[rn]=i;
      
    }
  }

  postGame(){
    for(var index=0;index<this.matches.length;index++){
      var counter=0;
      for(var dd=0;dd<4;dd++){
        while(this.matches[index].players[dd].id!==this.picklePlayers[counter].id){
          counter++;
        }
        this.picklePlayers[counter]=this.matches[index].players[dd];
      }

    }
    var count=0;
    console.log(this.singleGame);
    if(this.singleGame!==undefined){
      while(this.singleGame.player1.id!==this.picklePlayers[count].id){
        count++;
      }
      this.picklePlayers[count]=this.singleGame.player1;
      this.picklePlayers[count].singles=true;
      count=0;
      while(this.singleGame.player2.id!==this.picklePlayers[count].id){
        count++;
      }
      this.picklePlayers[count]=this.singleGame.player2;
      this.picklePlayers[count].singles=true;
    }
    if(this.byeRound==true){
      for(var index=0;index<this.picklePlayers.length;index++){
        if(this.picklePlayers[index].id==this.byePlayer.id){
          this.picklePlayers[index]=this.byePlayer;
          this.picklePlayers[index].bye=true;
        }
      }
    }

  }

  nextRound(){
    if(this.nextButton===true){
      this.rounds++;
      console.log(this.doublesWinners);
      for(var index=0;index<this.picklePlayers.length;index++){
        for(var dex=0;dex<this.doublesWinners.length;dex++){
          if(this.doublesWinners[dex].id==this.picklePlayers[index].id)
          {
            this.picklePlayers[index].wins++;
          }
        }
        if(this.singlesWinner!==undefined){
          if(this.singlesWinner.id==this.picklePlayers[index].id)
          {
            this.picklePlayers[index].wins++;
          }
        }
        
        
      }
      this.postGame();
      this.refresh();
      this.nextButton=false;
      this.competitveButton=false;
      this.in=true;
      this.doublesWinners=[];
      this.singlesWinner=new Playa(0);
    }else{
      let alert = this.alertCtrl.create({
        title: 'Select Winners',
        subTitle: 'Make sure at least one round has a selected winner.',
        buttons: ['Ok']
      });
      alert.present();
    }

  }

  addPlayer(){
    if(this.in==false){
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot add player once a winner has been selected for the round. Desselect the winner or procede to next round to add player.',
        buttons: ['ok']
      });
      alert.present();
    }else{
    var newPlayerNum=0;
    for(var dex=0;dex<this.picklePlayers.length;dex++){
      if(this.picklePlayers[dex].id>newPlayerNum){
        newPlayerNum=this.picklePlayers[dex].id;
      }
    }
    this.picklePlayers.push(new Playa(newPlayerNum+1));
    this.refresh();
  }
  }

  remove(){
    if(this.in==false){
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot remove player once a winner has been selected for the round. Desselect the winner(s) or procede to next round to remove player.',
        buttons: ['ok']
      });
      alert.present();
    }else{
    let remove = this.modalCtrl.create(RemovePlayerPage,{totalPlayerNums: this.picklePlayers.length});
    remove.onDidDismiss(data =>{
      var checkNums=data;
      console.log(data);
      if(checkNums!==undefined){

        var num=-1;
        for(var dex=0;dex<this.picklePlayers.length;dex++){
          if(this.picklePlayers[dex].id==checkNums){
            num=dex;
            console.log(num);
          }
          console.log(num);
        }
        this.picklePlayers.splice(num,1);
        this.refresh();
      }
    });
    remove.present();
  }
  }
  refresh(){
    this.randomList(this.picklePlayers.length);
    this.matchups();
  }

  refreshButton(){
    if(this.in==false){
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot refresh once a winner has been selected for the round. Desselect the winner or procede to next round to reshuffle.',
        buttons: ['ok']
      });
      alert.present();
    }else{
      this.refresh();
    }
  }

  results(){
    if(this.rounds<2){
      let alert = this.alertCtrl.create({
        title:"Too Early",
        subTitle:'There are not enough rounds to show results. Please try again after playing a round or two.',
        buttons: ['ok']
      });
      alert.present();
    }else if(this.nextButton==true){
      let alert = this.alertCtrl.create({
        title: 'Not Right Now',
        subTitle: 'Looks like someone already won a game. Go to the next round to view results.',
        buttons:['ok']
      });
      alert.present();
    }else{
      let realSpots=this.picklePlayers;
      let round=this.rounds-1;
      for(let player of this.picklePlayers){
        player.winPerc=player.wins/round*100;
      }
      let players={
        players: this.picklePlayers.sort(function(a,b){
          return (b.wins)/(round)-(a.wins)/(round);
        }),
        rounds: round
      };
      this.navCtrl.push(ResultsPage,players);
      this.picklePlayers=realSpots;
    }
    
  }

}
class DoublesGame{
  buttonColor1='primary';
  buttonColor2='primary';
  court='';
  players=[]
  constructor(player1,player2,player3,player4,num){
    this.court=num;
    this.players.push(player1);
    this.players.push(player2);
    this.players.push(player3);
    this.players.push(player4);
  }
}

class SingleGame{
  court:number;
  player1:Playa;
  player2:Playa;
  constructor(player1,player2,num){
    this.player1=player1;
    this.player2=player2;
    this.court=num;
  }
}

class Playa {
  public wins=0;
  public winPerc=0;
  public id: number;
  public bye=false;
  public singles=false;

  constructor(num){
    this.id=num;
  }

  winna_winna(){
    this.wins++;
  }

  byeRound(){
    this.bye=true;
  }

}