import { PaymentMethodEnum } from "./payment-method.enum";

export type FormExpenseViewModel = {
    descricao: string;
    valor: number;
    data: Date;
    formaPagamento: PaymentMethodEnum;
    categoriasSelecionadas: string[];
};