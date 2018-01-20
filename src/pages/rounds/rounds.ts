import { Component } from '@angular/core';
import { ViewController,AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import {RemovePlayerPage} from '../remove-player/remove-player';
import{ResultsPage} from '../results/results';


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
  singlesRound=false;
  singleGame:SingleGame;
  byeRound=false;
  byePlayer:Playa;
  buttonColor=[];
  sbuttonColor1='primary';
  sbuttonColor2='primary';
  rounds;
  error=false;
  singlesWinner:Playa;
  doublesWinners=[];
  competetiveRound=false;
  selectedButtons=[];
  singlesButton=false;

  constructor(public viewCtrl: ViewController,public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    this.rounds=1;
    this.playerNumber=this.navParams.get('number');
     console.log('Welcome to Rounds Play');
     this.picklePlayers=[];
      for(var person=1; person<=this.playerNumber;person++){
      this.picklePlayers.push(new Playa(person));
    }
    this.refresh();
    
  }

  allHaveHadByes(){
    var allPlayed=true;
    for(var index=0;index<this.picklePlayers.length;index++){
      if(this.picklePlayers[index].playedBye===false){
        allPlayed=false;
      }
    }
    if(allPlayed===true){
      for(var dex=0;dex<this.picklePlayers.length;dex++)
      {
        this.picklePlayers[dex].playedBye=false;
      }
    }
  }

  allHavePlayedSingles(){
    var count=0;
    for(var index=0;index<this.picklePlayers.length;index++){
      if(this.picklePlayers[index].playedSingles===false){
        count++;
      }
    }
    if(count<2){
      for(var dex=0;dex<this.picklePlayers.length;dex++)
      {
        this.picklePlayers[dex].playedSingles=false;
      }
    }
  }

  matchups(){
    this.matches=[];
    this.selectedButtons=[];
    this.singlesButton=false;
    if(this.picklePlayers.length%4===0){
      this.byeRound=false;
      this.singlesRound=false;
      for(var index=0;index<this.picklePlayers.length;index+=4){
        this.selectedButtons.push(false);
        this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+1],this.picklePlayers[index+2],this.picklePlayers[index+3],index/4+1))
      }
    }else if(this.picklePlayers.length%4===1){
      this.byeRound=true;
      this.singlesRound=false;
      this.allHaveHadByes();
      while(this.picklePlayers[this.picklePlayers.length-1].playedBye){
        this.randomList(this.picklePlayers.length);
      }
      for(var dex=0;dex<this.picklePlayers.length-1;dex+=4){
        this.selectedButtons.push(false);
        this.matches.push(new DoublesGame(this.picklePlayers[dex],this.picklePlayers[dex+1],this.picklePlayers[dex+2],this.picklePlayers[dex+3],dex/4+1))
      }
      this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
    }
    else if(this.picklePlayers.length%4===3){
      this.allHaveHadByes();
      while(this.picklePlayers[this.picklePlayers.length-1].playedBye){
        this.randomList(this.picklePlayers.length);
      }
      this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
      this.allHavePlayedSingles();
      while(this.picklePlayers[this.picklePlayers.length-2].playedSingles){
        this.randomList(this.picklePlayers.length-1);
      }
      var player1=this.picklePlayers[this.picklePlayers.length-2];
      while(this.picklePlayers[this.picklePlayers.length-3].playedSingles){
        this.randomList(this.picklePlayers.length-2);
      }
      var player2=this.picklePlayers[this.picklePlayers.length-3];
      var court=Math.floor(this.picklePlayers.length/4)+1;
      this.singleGame=new SingleGame(player1,player2,court);
      this.sbuttonColor1='primary';
      this.sbuttonColor2='primary';
     
      this.byeRound=true;
      this.singlesRound=true;
      for(var index1=0;index1<this.picklePlayers.length-3;index1+=4){
        this.selectedButtons.push(false);
        this.matches.push(new DoublesGame(this.picklePlayers[index1],this.picklePlayers[index1+1],this.picklePlayers[index1+2],this.picklePlayers[index1+3],index1/4+1))
      }
    }
    else{
      this.byeRound=false;
      this.singlesRound=true;
      this.allHavePlayedSingles();
      while(this.picklePlayers[this.picklePlayers.length-1].playedSingles){
        this.randomList(this.picklePlayers.length);
      }
      this.sbuttonColor1='primary';
      this.sbuttonColor2='primary';
      var player11=this.picklePlayers[this.picklePlayers.length-1];
      while(this.picklePlayers[this.picklePlayers.length-2].playedSingles){
        this.randomList(this.picklePlayers.length-1);
      }
      var player22=this.picklePlayers[this.picklePlayers.length-2];
     
      var court1=Math.floor(this.picklePlayers.length/4)+1;
      this.singleGame=new SingleGame(player11,player22,court1);
      for(var index2=0;index2<this.picklePlayers.length-2;index2+=4){
        this.selectedButtons.push(false);
        this.matches.push(new DoublesGame(this.picklePlayers[index2],this.picklePlayers[index2+1],this.picklePlayers[index2+2],this.picklePlayers[index2+3],index2/4+1))
      }
    }
    
  }

  winnerWinnerDoubles(cnum,bnum,plyr1,plyr2,plyr3,plyr4){
    if(this.matches[cnum-1].buttonColor1==='primary'&&this.matches[cnum-1].buttonColor2==='primary'){
      if(bnum===1)
      {
        this.matches[cnum-1].buttonColor1='secondary';
        this.selectedButtons[cnum-1]=true;
        
      }else if(bnum===2){
        this.matches[cnum-1].buttonColor2='secondary';
        this.selectedButtons[cnum-1]=true;
      }
      this.doublesWinners.push(plyr1);
      this.doublesWinners.push(plyr2);
      this.in=false;


      
    }else if(this.matches[cnum-1].buttonColor1==='secondary'||this.matches[cnum-1].buttonColor2==='secondary'){
      if(bnum===1){
        this.matches[cnum-1].buttonColor1='primary';
        this.selectedButtons[cnum-1]=false;
       
      }else if(bnum===2){
        this.matches[cnum-1].buttonColor2='primary';
        this.selectedButtons[cnum-1]=false;
        
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

      this.singlesButton=true;

      
    }else if(this.sbuttonColor1==='secondary'||this.sbuttonColor2==='secondary'){
      if(num===1)
      {
        this.sbuttonColor1='primary';
      }else if(num===2){
        this.sbuttonColor2='primary';
      }
      this.singlesButton=false;
      this.in=true;
      this.singlesWinner=new Playa(0);
      
    }

  }

  competeButton(){
    if(this.competetiveRound==false){
      let alert = this.alertCtrl.create({
        title: 'Continue?',
        message: 'Once you set the competitve matchups, you will proceed to a final round. You will not be able to continue to another round. Would you like to proceed?',
        buttons: [
          {
            text:'yes',
            handler: () =>{
              
              this.competetiveRound=true;
              this.competeShuff();
            }
          },
          {
            text: 'no',
            handler: () =>{
  
            }
          }
        ]
      });
      alert.present();
    }
    else if(this.buttonSelected()==false){
      let alert = this.alertCtrl.create({
        title: 'Select a Winner',
        subTitle: 'You need to select a winner of at least one round to proceed to another round.',
        buttons: ['ok' ]
      });
      alert.present();
    }
    else{
      this.competeShuff();
    }
  }
  

  competeShuff(){
      this.re_align_Players();
      this.picklePlayers.sort(function(a,b){
        if((((b.winPerc)-(a.winPerc))==0)){
          if(((a.roundsPlayed)-(b.roundsPlayed))==0)
          {
            return (a.id)-(b.id);
          }else{
            return (b.roundsPlayed)-(a.roundsPlayed);
          }
          
        }
        else{
          return (b.winPerc)-(a.winPerc);
        }
      });
      this.rounds++;
      console.log(this.picklePlayers);
      this.matches=[];
      this.selectedButtons=[];
      this.singlesButton=false;
      if(this.picklePlayers.length%4===0){
        this.byeRound=false;
        this.singlesRound=false;
        for(var index=0;index<this.picklePlayers.length;index+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index],this.picklePlayers[index+3],this.picklePlayers[index+2],this.picklePlayers[index+1],index/4+1))
        }
      }else if(this.picklePlayers.length%4===1){
        this.byeRound=true;
        this.singlesRound=false;
        
        for(var dex=0;dex<this.picklePlayers.length-1;dex+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[dex],this.picklePlayers[dex+3],this.picklePlayers[dex+2],this.picklePlayers[dex+1],dex/4+1))
        }
        this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];

      }
      else if(this.picklePlayers.length%4===3){
       
        this.byePlayer=this.picklePlayers[this.picklePlayers.length-1];
        
        var player1=this.picklePlayers[this.picklePlayers.length-2];
        
        var player2=this.picklePlayers[this.picklePlayers.length-3];
       
        var court=Math.floor(this.picklePlayers.length/4)+1;
        this.singleGame=new SingleGame(player1,player2,court);
        this.sbuttonColor1='primary';
        this.sbuttonColor2='primary';
       
        this.byeRound=true;
        this.singlesRound=true;
        for(var index1=0;index1<this.picklePlayers.length-3;index1+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index1],this.picklePlayers[index1+3],this.picklePlayers[index1+2],this.picklePlayers[index1+1],index1/4+1))
        }
      }
      else{
        this.byeRound=false;
        this.singlesRound=true;
        this.sbuttonColor1='primary';
        this.sbuttonColor2='primary';
        var player11=this.picklePlayers[this.picklePlayers.length-1];
        var player22=this.picklePlayers[this.picklePlayers.length-2];
       
        var court1=Math.floor(this.picklePlayers.length/4)+1;
        this.singleGame=new SingleGame(player11,player22,court1);
        for(var index2=0;index2<this.picklePlayers.length-2;index2+=4){
          this.matches.push(new DoublesGame(this.picklePlayers[index2],this.picklePlayers[index2+3],this.picklePlayers[index2+2],this.picklePlayers[index2+1],index2/4+1))
        }
      }

      this.in=true;
    
    
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
            let data:number;
            this.viewCtrl.dismiss(data);
          }
        }
      ]
    });
    alert.present();
    
  }

  randomList(num){
    let m=num-1;
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

  buttonSelected(){
    var bool=false;
    for(let val of this.selectedButtons){
      if(val==true)
      {
        bool=true;
      }
    }
    if(this.singlesButton==true){
      bool=true;
    }
    return bool;
  }
  

  nextRound(){
    if(this.buttonSelected()===true&&this.competetiveRound==false){
      this.re_align_Players();
      this.rounds++;
      console.log(this.picklePlayers);
      
      this.refresh();

      this.in=true;
      this.doublesWinners=[];
      this.singlesWinner=new Playa(0);
    }else if(this.competetiveRound==true){
      let alert = this.alertCtrl.create({
        title: 'Competetive Round',
        subTitle: 'You can no longer use the random round because the competitve rounds have started.',
        buttons: ['Ok']
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: 'Select Winners',
        subTitle: 'Make sure at least one round has a selected winner.',
        buttons: ['Ok']
      });
      alert.present();
    }

  }

  re_align_Players(){
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
    for(var idex=0;idex<this.matches.length;idex++){
      
      for(var dd=0;dd<4;dd++){
        if(this.selectedButtons[idex]==true){
          this.matches[idex].players[dd].roundsPlayed++;
        }
        for(var num=0;num<this.picklePlayers.length;num++){
          if(this.picklePlayers[num].id==this.matches[idex].players[dd].id){
            this.picklePlayers[num]=this.matches[idex].players[dd];
          }
        }
      }

    }
    var count=0;
    if(this.singleGame!==undefined){
      while(this.singleGame.player1.id!==this.picklePlayers[count].id){
        count++;
      }
      this.picklePlayers[count]=this.singleGame.player1;
      this.picklePlayers[count].roundsPlayed++;
      this.picklePlayers[count].playedSingles=true;
      count=0;
      while(this.singleGame.player2.id!==this.picklePlayers[count].id){
        count++;
      }
      this.picklePlayers[count]=this.singleGame.player2;
      this.picklePlayers[count].roundsPlayed++;
      this.picklePlayers[count].playedSingles=true;
    }
    if(this.byeRound==true){
      for(var bb=0;bb<this.picklePlayers.length;bb++){
        if(this.byePlayer.id==this.picklePlayers[bb].id){
          this.picklePlayers[bb].playedBye=true;
        }
      }
    }
    for(let player of this.picklePlayers){
      if(player.roundsPlayed>0){
        player.winPerc=Math.ceil(player.wins/player.roundsPlayed*100);
      }else{
        player.winPerc="0";
      }
    }

  }

  addPlayer(){
    if(this.buttonSelected()==true){
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
    if(this.buttonSelected()==true){
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
      if(checkNums!==undefined){

        var num=-1;
        for(var dex=0;dex<this.picklePlayers.length;dex++){
          if(this.picklePlayers[dex].id==checkNums){
            num=dex;
          }
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
    if(this.buttonSelected()==true){
      let alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Cannot refresh once a winner has been selected for the round. Desselect the winner or procede to next round to reshuffle.',
        buttons: ['ok']
      });
      alert.present();
    }else if(this.competetiveRound==true){
      let alert = this.alertCtrl.create({
        title: "Not This Time",
        subTitle: "Sorry you cannot shuffle a competitive round.",
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
    }else if(this.buttonSelected()==true){
      let alert = this.alertCtrl.create({
        title: 'Not Right Now',
        subTitle: 'Looks like someone already won a game. Go to the next round to view results.',
        buttons:['ok']
      });
      alert.present();
    }else{
      let realSpots=this.picklePlayers;
     
      let players={
        players: realSpots.sort(function(a,b){
          if((((b.winPerc)-(a.winPerc))==0)){
            if(((a.roundsPlayed)-(b.roundsPlayed))==0)
            {
              return (a.id)-(b.id);
            }else{
              return (b.roundsPlayed)-(a.roundsPlayed);
            }
            
          }
          else{
            return (b.winPerc)-(a.winPerc);
          }
        })
      };
      this.navCtrl.push(ResultsPage,players);
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
  public playedBye=false;
  public playedSingles=false;
  public roundsPlayed=0;

  constructor(num){
    this.id=num;
  }



}