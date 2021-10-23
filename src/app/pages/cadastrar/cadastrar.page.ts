import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Filme } from 'src/app/class/filme';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CrudFilmeService } from 'src/app/services/crud-filme.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  private _formCadastrar: FormGroup;
  constructor(public alertController: AlertController, 
    private _router: Router,
    private _filmeServiceDB:CrudFilmeService,
    private imageService: ImageService,
    private _formBuilder: FormBuilder,
    private auth: AuthServiceService) {
     }

  ngOnInit() {
    this._formCadastrar = this._formBuilder.group({
      titulo : ['',[Validators.required, Validators.minLength(8)]], 
      sinopse: ['',[Validators.required, Validators.minLength(14)]],
      duracaoMinutos: ['',[Validators.required]],
      anoLancamento: ['',[Validators.required]],
      diretor: ['',[Validators.required]],
      classificacaoIndicativa: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      orcamento: ['',[Validators.required]],
      file:['', [Validators.required]],
      fileSource:['', [Validators.required]]
    });
  }

  private get errorControl(){
    return this._formCadastrar.controls;
  }

  private submitForm(): boolean{
    if(!this._formCadastrar.valid){
      this.presentAlert('Filmes', 'Cadastrar', 'Preencha todos os campos!');
      return false;
    } else {
      this.cadastrar();
      return true;
    }
  }

  private cadastrar(): void{
    let filme:Filme = new Filme(
      this._formCadastrar.value['titulo'],
      this._formCadastrar.value['sinopse'],
      this._formCadastrar.value['duracaoMinutos'],
      this._formCadastrar.value['anoLancamento'],
      this._formCadastrar.value['diretor'],
      this._formCadastrar.value['classificacaoIndicativa'],
      this._formCadastrar.value['genero'],
      this._formCadastrar.value['orcamento']
    )
    console.log(this._formCadastrar.get('fileSource'))
    this.imageService.uploadStorage(this._formCadastrar.get('fileSource'), filme)

    this.presentAlert('Filmes','Cadastrar', filme.getTitulo() + ' cadastrado com Sucesso!');
    this._router.navigate(['home'])

    
  }

  async presentAlert(titulo:string, subtitulo:string, mensagem:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  public goHome():void{
    this._router.navigate(['home'])
  }

  onFileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this._formCadastrar.patchValue({
        fileSource: file
      });
    }
  }

  // public upload(event: FileList){
  //   this.imageService.uploadStorage(event);
  // }

}
