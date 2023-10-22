import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListTasksComponent } from "./list-tasks/list-tasks.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { DeleteTaskComponent } from "./delete-task/delete-task.component";
import { NgModule, inject } from "@angular/core";
import { FormTaskViewModel } from "./models/form-task.view-model";
import { ListTaskViewModel } from "./models/list-task.view-model";
import { ViewTaskViewModel } from "./models/view-task.view-model";
import { TasksService } from "./services/tasks.service";

const formsTasksResolver: ResolveFn<FormTaskViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(TasksService).selectById(route.paramMap.get('id')!);
};

const listTasksResolver: ResolveFn<ListTaskViewModel[]> = () => {
    return inject(TasksService).getAll();
}

const viewTasksResolver: ResolveFn<ViewTaskViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(TasksService).selectFullTaskById(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListTasksComponent,
        resolve: { tasks: listTasksResolver }
    },
    {
        path: 'add',
        component: AddTaskComponent,
    },
    {
        path: 'edit/:id',
        component: EditTaskComponent,
        resolve: { tasks: formsTasksResolver }
    },
    {
        path: 'delete/:id',
        component: DeleteTaskComponent,
        resolve: { tasks: viewTasksResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}