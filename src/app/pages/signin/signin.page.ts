import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/class/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  _formLogar : FormGroup;
  _isSubmitted = false;
  user : User;
  constructor(public alertController: AlertController,
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService) {
      this.user = this.authService.getUserLogado()
      if(this.user != null){
        console.log("TESTE DO CARALHO")
        console.log(this.user)
      }
     }

  ngOnInit() {
    this._formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.user = this.authService.getUserLogado()
    if(this.user != null){
      this.router.navigate(['home']);
    }

  }
  

  get errorControl(){
    return this._formLogar.controls;
  }
  

  private submitForm(): boolean{
    this._isSubmitted = true;
    if(!this._formLogar.valid){
      this.presentAlert('Filmes', 'Cadastrar', 'Preencha todos os campos!');
      return false;
    } else {
      this.signIn();      
    }
  }


  private _signInGoogle(): void{
    this.authService.signInWithGoogle();
  }

  private signIn(){
    this.authService.signIn(this._formLogar.value['email'], this._formLogar.value['password'])
    .then((res) => {
      this.presentAlert("Filmes", "Bem vindo!", "Bem vindo!");
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      this.presentAlert("Filmes", "Erro ao logar", "Tente novamente");
      console.log(error.message);
    })
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

  public _irParaSignUp(){
    this.router.navigate(["/signup"])
  }
}
