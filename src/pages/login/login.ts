import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthorizorProvider} from '../../providers/authorizor/authorizor';
import {TabsPage} from '../../pages/tabs/tabs';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username='djbroeder@cox.net';
  password='111111';
  usernameColor='black';
  passwordColor='black';
  message;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthorizorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  recoverPassword(){
    
  }

  login(){
    console.log(this.username +' and '+this.password)
    this.auth.loginUser(this.username,this.password).then((result)=>{
      this.navCtrl.setRoot(TabsPage);
    }).catch((e)=>{
      console.error(e.message);
      this.message=e.message
      this.usernameColor='red';
      this.passwordColor='red';
    })
    
  }

  register(){
    this.usernameColor='black';
      this.passwordColor='black';
      this.message=''
    this.navCtrl.push("RegisterPage");
  }

}
