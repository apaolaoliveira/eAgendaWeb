import { UserTokenViewModel } from "./user-token.view-model";

export type TokenViewModel = {
    chave: string;
    dataExpiracao: Date;
    usuarioToken: UserTokenViewModel;
}