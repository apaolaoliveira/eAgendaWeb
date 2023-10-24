import { PriorityTaskEnum } from "./priority-task.enum";
import { TaskItemViewModel } from "./task-item.view-model";

export type FormTaskViewModel = {
    titulo: string;
    prioridade: PriorityTaskEnum;
    itens: TaskItemViewModel[];
}