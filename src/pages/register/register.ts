import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthorizorProvider } from '../../providers/authorizor/authorizor'
import {PlayersProvider} from '../../providers/players/players';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email;
  password1;
  password2;
  inputType = 'password';
  textColor = 'black';
  showPassword = false;
  message='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthorizorProvider,public playerProv:PlayersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  changeInputType() {
    if (this.showPassword) {
      this.showPassword = false;
      this.inputType = 'password'
    } else {
      this.showPassword = true;
      this.inputType = 'string';
    }
  }

  register() {
    if (this.password1 === this.password2) {
      this.auth.signupUser(this.email, this.password1).then((result) => {
        console.log(result);
        this.playerProv.createUser();
        this.navCtrl.pop();
      }).catch((e) => {
        this.message=e.message;
        console.error(e);
        this.textColor = 'red'
      })
    } else {
      this.textColor = 'red';
      this.message="Passwords do not match";
    }
  }

}
