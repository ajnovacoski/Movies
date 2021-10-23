export class Filme {
    private _titulo:string;
    private _sinopse:string;
    private _duracao_minutos:number;
    private _ano_lancamento:string;
    private _diretor:string;
    private _classificacao_indicativa:string;
    private _genero:string;
    private _orcamento:number;
    private _id:string;
    private _imgURL: string;


    constructor(titulo:string, sinopse:string, duracao_minutos:number, ano_lancamento:string, diretor:string, classificacao_indicativa:string, genero:string, orcamento:number){  
        this._titulo = titulo;
        this._sinopse = sinopse;
        this._duracao_minutos = duracao_minutos;
        this._ano_lancamento = ano_lancamento;
        this._diretor = diretor;
        this._classificacao_indicativa = classificacao_indicativa;
        this._genero = genero;
        this._orcamento = orcamento; 
    }

    public getImgURL(): string{
        return this._imgURL;
    }

    public setImgURL(imgURL:string): void{
        this._imgURL = imgURL;        
    }

    public getId(): string{
        return this._id
    }

    public setId(id: string): void{
        this._id = id;
    }

    public getTitulo(): string{
        return this._titulo;
    }
    public setTitulo(titulo:string):void{
        this._titulo = titulo;
    }
    public getSinopse(): string{
        return this._sinopse;
    }
    public setSinopse(sinopse:string):void{
        this._sinopse = sinopse;
    }
    public getDuracao():number{
        return this._duracao_minutos;
    }
    public setDuracao(duracao_minutos:number):void{
        this._duracao_minutos = duracao_minutos;
    }
    public getAnoLancamento():string{
        return this._ano_lancamento;
    }
    public setAnoLancamento(ano_lancamento:string):void{
        this._ano_lancamento = ano_lancamento;        
    }
    public getDiretor():string{
        return this._diretor;
    }
    public setDiretor(diretor:string):void{
        this._diretor = diretor;
    }
    public getClassificacaoIndicativa():string{
        return this._classificacao_indicativa;
    }
    public setClassificacaoIndicativa(classificadao_indicativa:string):void{
        this._classificacao_indicativa = classificadao_indicativa;
    }
    public getGenero():string{
        return this._genero;
    }
    public setGenero(genero:string):void{
        this._genero = genero;
    }
    public getOrcamento():number{
        return this._orcamento;
    }
    public setOrcamento(orcamento:number):void{
        this._orcamento = orcamento;
    }

}
