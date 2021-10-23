import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize, throwIfEmpty } from 'rxjs/operators';
import { Filme } from '../class/filme';
import { CrudFilmeService } from './crud-filme.service';

export interface ImgData{
  name: string;
  downloadURL: string;
}
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  tarefa: AngularFireUploadTask;
  uploadedFileUrl: Observable<string>
  arquivo: string;

  constructor(
    private storage: AngularFireStorage,
    private database: AngularFireDatabase,
    private filmeDB: CrudFilmeService
  ) { }

  // uploadStorage(event: FileList, stringteste:string){
  //   const  file = event.item(0)
  //   if(file.type.split('/')[0] != 'image'){
  //     console.log('Tipo nao suportado!');
  //     return;
  //   }
  //   let retorno = '';
  //   this.arquivo = file.name;
  //   const path = `images/${file.name}`;
  //   const fileRef = this.storage.ref(path);
  //   this.tarefa = this.storage.upload(path, file);
  //   this.tarefa.snapshotChanges().pipe(
  //     finalize(()=>{
  //       this.uploadedFileUrl = fileRef.getDownloadURL();
  //       this.uploadedFileUrl.subscribe((resp)=>{
  //         this.uploadDatabase({name:file.name,
  //         downloadURL:resp})
  //         stringteste = resp;
  //       })
  //     })
  //   ).subscribe();
  // }

    
  uploadStorage(rawFile, filme: Filme){
    const file = rawFile.value
    if(file.type.split('/')[0] != 'image'){
      console.log('Tipo nao suportado!')
      return;
    }
    this.arquivo = file.name;
    const path = `images/${file.name}`;
    const fileRef = this.storage.ref(path);
    this.tarefa = this.storage.upload(path, file);
    this.tarefa.snapshotChanges().pipe(
      finalize(() => {
        this.uploadedFileUrl = fileRef.getDownloadURL();
        this.uploadedFileUrl.subscribe( resp => {
          this.uploadDatabase({name:file.name, downloadURL:resp}, filme);
        })
      })
    ).subscribe();  
  }

  uploadDatabase(image: ImgData, filme: Filme){
    console.log(image.downloadURL)
    filme.setImgURL(image.downloadURL);
    this.filmeDB.createFilme(filme);
  }
  // uploadDatabase(image: ImgData){
  //   return this.database.database.ref('images/').push(image);
  // }

  getImages(){
    return this.database.list('images/').snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    );
  }
}
