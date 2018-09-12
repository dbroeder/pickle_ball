import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';



@Injectable()
export class AuthorizorProvider {

  constructor(public afAuth: AngularFireAuth) {

  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
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
