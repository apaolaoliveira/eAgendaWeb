export class ListContactViewModel {
    id: string;
    nome: string;
    telefone: string;
    cargo: string;
    empresa: string;

    constructor(
        id: string,
        nome: string,
        telefone: string,
        cargo: string,
        empresa: string
    ){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.cargo = cargo;
        this.empresa =  empresa;
    }
}