import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import {AuthorizorProvider} from '../../providers/authorizor/authorizor';
import {LoginPage} from '../login/login'

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthorizorProvider,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logOut(){
    this.auth.logoutUser().then(()=>{
      this.app.getRootNav().push(LoginPage)
    }).catch((e)=>{
      console.error(e);
    })
  }

}
