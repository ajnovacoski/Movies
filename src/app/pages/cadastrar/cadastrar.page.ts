import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Filme } from 'src/app/class/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  private _formCadastrar: FormGroup;
  private _isSubmited: boolean = false;

  constructor(public alertController: AlertController, 
    private _router: Router,
    private _filmeService:FilmeService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._formCadastrar = this._formBuilder.group({
      titulo : ['',[Validators.required, Validators.minLength(8)]], 
      sinopse: ['',[Validators.required, Validators.minLength(14)]],
      duracaoMinutos: ['',[Validators.required]],
      anoLancamento: ['',[Validators.required]],
      diretor: ['',[Validators.required]],
      classificacaoIndicativa: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      orcamento: ['',[Validators.required]]
    });
  }

  private get errorControl(){
    return this._formCadastrar.controls;
  }

  private submitForm(): boolean{
    this._isSubmited = true;
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
    this._filmeService.inserir(filme);
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
    this._router.navigate(["../home"])
  }

}
