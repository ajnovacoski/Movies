import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/class/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private _lista_filmes: any[];

  constructor(
    private _router:Router,
    private _filmeService:FilmeService
  ) {
    this._lista_filmes = _filmeService.getFilmes();    
  }


  private irParaCadastrarPage() : void{
    this._router.navigate(["/cadastrar"])
  }

  private detalhar(filme: Filme): void{
    this._router.navigateByUrl("/detalhar", 
    {state: {objeto: filme}
  })
  }

}
