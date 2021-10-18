import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private _formCadastrar: FormGroup
  private _isSubmited : boolean = false;
  constructor(
    public router : Router,
    public alertController : AlertController,
    public formBuilder : FormBuilder,
    public authService : AuthServiceService

  ) { }

  ngOnInit() {
    this._formCadastrar = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required]]
    })
  }

  public _signUp() : void {
    this.authService.signUpWithEmailAndPass(
      this._formCadastrar.value['email'],
      this._formCadastrar.value['senha']
    )
    .then((res) => {
      this.presentAlert("Agenda", "Cadastro","Cadastro Efetuado com Sucesso!")
    }).catch((error) => {
      this.presentAlert("Agenda", "Cadastro","Houve um erro!")
      console.log(error.message)
    })
  }

  public submitForm(): void{
    this._isSubmited = true;
    if(!this._formCadastrar.valid){
      this.presentAlert("Testefoi", "Testefoi", "Nao foi")
    } else {     
      if(this._formCadastrar.value[('senha')] == this._formCadastrar.value[('confSenha')]){
        this._signUp()
        this.router.navigate(['signin']);
      }
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

  public get errorControl(){
    return this._formCadastrar.controls;
  }

  public goHome(){
    this.router.navigate(['signin']);
  }
}
