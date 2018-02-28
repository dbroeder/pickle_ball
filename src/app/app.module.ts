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
import {Storage} from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { PlayersProvider } from '../providers/players/players';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    RemovePlayerPage,
    RoundsPage,
    ResultsPage,
    CreatePlayerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    CreatePlayerPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlayersProvider
  ]
})
export class AppModule {}
