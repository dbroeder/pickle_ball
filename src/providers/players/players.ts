import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

/*
  Generated class for the PlayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayersProvider {

  constructor( public storage: Storage) {
    
  }

  get(dataBaseName: any) {
    
    console.log("Player Provider getting data from "+dataBaseName);
    return this.storage.get(dataBaseName).then((data) => {
      return data;
    });
  }
  set(storeTag:any,item: any){
    console.log("Setting value: "+item+" with key: "+storeTag);
    this.storage.set(storeTag,item);
  }


}
