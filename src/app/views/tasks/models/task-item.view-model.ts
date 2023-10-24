import { ItemStatusEnum } from "./status-item.enum";

export type TaskItemViewModel = {
    id?: string;
    titulo: string;
    status: ItemStatusEnum;
    concluido: boolean;
};