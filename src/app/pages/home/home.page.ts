import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/class/filme';
import { User } from 'src/app/class/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CrudFilmeService } from 'src/app/services/crud-filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _lista_filmes: any[];
  private data: any;
  private _user: User;

  constructor(
    private _router:Router,
    private _filmeServiceDB:CrudFilmeService,
    private _authService:AuthServiceService
  ) {    
    this._user = this._authService.getUserLogado();
    this.data = this._filmeServiceDB.getFilmes();
    this.data.forEach(element => {
      const lista = element as Array<any>;
      this._lista_filmes = []
      lista.forEach(c => {
        let filme = new Filme(c.data._titulo, c.data._sinopse, c.data._duracao_minutos, c.data._ano_lancamento, 
          c.data._diretor, c.data._classificacao_indicativa, c.data._genero, c.data._orcamento)
        filme.setId(c.key)
        this._lista_filmes.push(filme)
      });
    });
  }

  ngOnInit() {
  }


  private irParaCadastrarPage() : void{
    this._router.navigate(["/cadastrar"])
  }

  private detalhar(filme: Filme): void{
    this._router.navigateByUrl("/detalhar", 
    {state: {objeto: filme}
  })
  }

  private logout(): void{
    this._authService.signOut()
  }

  
}
