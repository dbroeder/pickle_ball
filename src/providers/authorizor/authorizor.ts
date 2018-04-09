import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase/app';
import {TabsPage} from '../../pages/tabs/tabs';
import {LoginPage} from '../../pages/login/login';



@Injectable()
export class AuthorizorProvider {

  constructor(public afAuth: AngularFireAuth) {

  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string):Promise<any>{
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() : Promise<any>{
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }
  

}
