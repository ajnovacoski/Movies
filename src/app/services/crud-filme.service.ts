import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Filme } from '../class/filme';
import { User } from '../class/user';
import { AuthServiceService } from './auth-service.service';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CrudFilmeService {
  private _user : User;
  private _PATH : string = 'filmes/';

  constructor(
    private auth: AuthServiceService,
    private db: AngularFireDatabase
  ) {    
    this._PATH = 'filmes/'
    if(this.auth.estaLogado()){
      this._user = this.auth.getUserLogado();
      this._PATH = this._PATH +""+this._user.uid
    }
   }

   createFilme(filme: Filme){
     return this.db.database.ref(this._PATH).push(filme);
   }

   getFilmes(){
     return this.db.list(this._PATH).
     snapshotChanges().pipe(
       map((action) => {
         return action.map((dados) =>({
           key: dados.payload.key,
           data: dados.payload.val()
         }))
       })
     )
   }

   getFilme(key: string){
    return this.db.list(this._PATH, ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    );
   }

   editFilme(key: string, filme: any){
     return this.db.database.ref(this._PATH).child(key).update(filme);
   }

   removeFilme(key: any){
     return this.db.database.ref(this._PATH+"/"+key).remove();
   }
}
