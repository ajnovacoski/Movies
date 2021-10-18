import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Filme } from 'src/app/class/filme';
import { CrudFilmeService } from 'src/app/services/crud-filme.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  private _filme: Filme;
  private _isSubmited: boolean = false;
  private _editar: boolean = true;
  private _formDetalhar: FormGroup;

  constructor(
    public alertController: AlertController, 
    private _router: Router,
    private _filmeService:FilmeService,
    private _filmeServiceDB:CrudFilmeService,
    private _formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._filme = nav.extras.state.objeto;
    this._formDetalhar = this._formBuilder.group({
        titulo : [this._filme.getTitulo(), [Validators.required, Validators.minLength(8)]],
        sinopse: [this._filme.getSinopse(), [Validators.required, Validators.minLength(14)]],
        duracaoMinutos: [this._filme.getDuracao(), [Validators.required]],
        anoLancamento: [this._filme.getAnoLancamento(), [Validators.required]],
        diretor: [this._filme.getDiretor(), [Validators.required]],
        classificacaoIndicativa: [this._filme.getClassificacaoIndicativa(), [Validators.required]],
        genero: [this._filme.getGenero(), [Validators.required]],
        orcamento: [this._filme.getOrcamento(), [Validators.required]]
    });
  }

  
  private get errorControl(){
    return this._formDetalhar.controls;
  }

  private submitForm(): boolean{
    this._isSubmited = true;
    if(!this._formDetalhar.valid){
      this.presentAlert('Filmes', 'Edição', 'Preencha todos os campos!');
      return false;
    } else {
      this.editar();
      return true;
    }
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

    public goHome(): void{
      this._router.navigate(["../home"]);
    }
  
    public editar(): void{
      let _filmeEditado : Filme = new Filme(this._formDetalhar.value['titulo'], this._formDetalhar.value['sinopse'], this._formDetalhar.value['duracaoMinutos'],
      this._formDetalhar.value['anoLancamento'], this._formDetalhar.value['diretor'], this._formDetalhar.value['classificacaoIndicativa'],
      this._formDetalhar.value['genero'], this._formDetalhar.value['orcamento']);
      this._filmeServiceDB.editFilme(this._filme.getId(), _filmeEditado)
      .then(() => {
        this.presentAlert('Filme', 'Editar', 'Contato Editado com Sucesso!');
        this._router.navigate(['home']);
      }).catch((error) => {
        this.presentAlert('Filme', 'Editar', 'Houve um erro!');
        console.log(error.message);
      })
      
    }
  
    public excluir(): void{
      this._filmeServiceDB.removeFilme(this._filme.getId())
      .then(() => {
        this.presentAlert('Filme', 'Remover', 'Contato Removido com Sucesso!');
        this._router.navigate(['home']);
      }).catch((error) =>{
        this.presentAlert('Filme', 'Remover', 'Houve um erro!');
        console.log(error.message);
      })
    }

}
