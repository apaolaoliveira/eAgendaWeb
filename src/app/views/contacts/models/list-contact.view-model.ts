export class ListContactViewModel {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
    empresa: string;
    favorito: boolean;

    constructor(
        id: string,
        nome: string,
        email: string,
        telefone: string,
        cargo: string,
        empresa: string,
        favorito: boolean
    ){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cargo = cargo;
        this.empresa =  empresa;
        this.favorito = favorito;
    }
}