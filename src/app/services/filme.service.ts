import { Injectable } from '@angular/core';
import { Filme } from '../class/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private _filmes: Filme[] = [];
  constructor() {
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
