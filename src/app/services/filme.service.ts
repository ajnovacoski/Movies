import { Injectable } from '@angular/core';
import { Filme } from '../class/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private _filmes: Filme[] = [];
  constructor() {
    let filme = new Filme("As Branquelas", 
    "Dois negao que quer virar mulher e branca, patricinha e os carai", 
    90, 
    2000, 
    "Andy Crawlford", 
    "l18", 
    "comedia", 
    20000);
    this._filmes.push(filme);
    let filme2 = new Filme("Bastardos Inglorios", 
    "Um bando de louco, querendo matar tudo que eh nazista filho da puta",
    120,
    1998,
    "Quentin Tarantino",
    "l16",
    "guerra",
    2000);
    this._filmes.push(filme2);
   }

  public getFilmes(): Filme[]{
    return this._filmes;
  }

  public inserir(filme: Filme):void{
    this._filmes.push(filme);
  }

  public editar(filme:Filme, filmeEditado: Filme):boolean{
    for(let i=0; i < this._filmes.length; i++){
      if((this._filmes[i].getId() == filme.getId())){
        console.log('teste')
        this._filmes[i].setTitulo(filmeEditado.getTitulo());
        this._filmes[i].setSinopse(filmeEditado.getSinopse());
        this._filmes[i].setDiretor(filmeEditado.getDiretor());
        this._filmes[i].setDuracao(filmeEditado.getDuracao());
        this._filmes[i].setAnoLancamento(filmeEditado.getAnoLancamento());
        this._filmes[i].setClassificacaoIndicativa(filmeEditado.getClassificacaoIndicativa());
        this._filmes[i].setGenero(filmeEditado.getGenero());
        this._filmes[i].setOrcamento(filmeEditado.getOrcamento());
        return true;
      }
    }
    return false;
  }

  public excluir(filme: Filme): boolean{
    for(let i=0; i < this._filmes.length; i++){
      if((this._filmes[i].getId() == filme.getId())){
        this._filmes.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
