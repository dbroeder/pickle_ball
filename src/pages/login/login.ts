import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthorizorProvider} from '../../providers/authorizor/authorizor';
import {RegisterPage} from '../../pages/register/register';
import {TabsPage} from '../../pages/tabs/tabs';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username='';
  password='';
  usernameColor='black';
  passwordColor='black';
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
      console.log(this.auth.getCurrentUser())
      this.navCtrl.setRoot(TabsPage);
    }).catch((e)=>{
      console.error(e);
      this.usernameColor='red';
  this.passwordColor='red';
    })
    
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
