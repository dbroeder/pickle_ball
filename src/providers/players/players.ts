import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

/*
  Generated class for the PlayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayersProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    
  }

  get(dataBaseName: any) {
    this.storage.get(dataBaseName).then((data) => {
      return data;
    });
  }
  set(storeTag:any,item: any){
    this.storage.set(storeTag,item);
  }


}
