import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RemovePlayerPage} from '../pages/remove-player/remove-player'
import { RoundsPage} from '../pages/rounds/rounds';
import {ResultsPage } from '../pages/results/results';
import {CreatePlayerPage} from '../pages/create-player/create-player';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { PlayersProvider } from '../providers/players/players';
import {SelectPlayerPage} from '../pages/select-player/select-player';
import {LeaguePlayPage} from '../pages/league-play/league-play';
import {CreateGroupsPage} from '../pages/create-groups/create-groups';
import {LongPressModule} from 'ionic-long-press';
import { DoublesMatchesProvider } from '../providers/doubles-matches/doubles-matches';
import { MatchesProvider } from '../providers/matches/matches';
import { SinglesMatchesProvider } from '../providers/singles-matches/singles-matches';
import { PlayaProvider } from '../providers/playa/playa';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AuthorizorProvider } from '../providers/authorizor/authorizor';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
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
    RemovePlayerPage,
    RoundsPage,
    ResultsPage,
    CreatePlayerPage,
    SelectPlayerPage,
    LeaguePlayPage,
    CreateGroupsPage,
    LoginPage,
    RegisterPage,
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
    RemovePlayerPage,
    RoundsPage,
    ResultsPage,
    CreatePlayerPage,
    SelectPlayerPage,
    LeaguePlayPage,
    CreateGroupsPage,
    LoginPage,
    RegisterPage,
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
