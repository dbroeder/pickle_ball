import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { PlayersProvider } from '../providers/players/players';
import {LoginPage} from '../pages/login/login'
import {LongPressModule} from 'ionic-long-press';
import { DoublesMatchesProvider } from '../providers/doubles-matches/doubles-matches';
import { MatchesProvider } from '../providers/matches/matches';
import { SinglesMatchesProvider } from '../providers/singles-matches/singles-matches';
import { PlayaProvider } from '../providers/playa/playa';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AuthorizorProvider } from '../providers/authorizor/authorizor';
import {LogoutPage} from '../pages/logout/logout'

export const firebaseConfig = {
  apiKey: "AIzaSyB43kdiULmydW4xKiJB-b0yqkpbkHPvXOA",
  authDomain: "pickle-ball-server.firebaseapp.com",
  databaseURL: "https://pickle-ball-server.firebaseio.com",
  projectId: "pickle-ball-server",
  storageBucket: "pickle-ball-server.appspot.com",
  messagingSenderId: "686088552712"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LongPressModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    LogoutPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlayersProvider,
    DoublesMatchesProvider,
    MatchesProvider,
    SinglesMatchesProvider,
    PlayaProvider,
    AngularFirestore,
    AuthorizorProvider
  ]
})
export class AppModule {}
