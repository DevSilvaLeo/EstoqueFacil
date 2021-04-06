export class Produto{
    id:string;
    name:string;
    descricao:string;
    categoria:string;
    quantidade: string;
    foto:string;
    preco:string;

    constructor(id?:string,name?:string,descricao?:string,categoria?:string,preco?:string,quantidade?:string,foto?:string){
        this.id = id;
        this.name = name;
        this.descricao = descricao;
        this.categoria = categoria;
        this.quantidade = quantidade;
        this.foto = foto;
        this.preco = preco;
    }
}