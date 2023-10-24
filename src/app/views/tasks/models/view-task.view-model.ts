import { ViewTaskItemViewModel } from "./view-item.view-model";

export type ViewTaskViewModel = {
    id: string;
    titulo: string;
    dataCriacao: Date;
    dataConclusao?: Date;

    quantidadeItens: number;
    percentualConcluido: number;

    prioridade: string;
    situacao: string;

    itens: ViewTaskItemViewModel[];
}