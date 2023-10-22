export type ViewExpenseViewModel = {
    id: string;
    descricao: string;
    valor: number;
    formaPagamento: string;
    data: Date;
    categoriasSelecionadas: string[];
}