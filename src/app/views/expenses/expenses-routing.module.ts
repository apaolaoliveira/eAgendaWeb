import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListExpensesComponent } from "./list-expenses/list-expenses.component";
import { AddExpenseComponent } from "./add-expense/add-expense.component";
import { EditAppointmentComponent } from "../appointments/edit-appointment/edit-appointment.component";
import { DeleteExpenseComponent } from "./delete-expense/delete-expense.component";
import { FormExpenseViewModel } from "./models/form-expense.view-model";
import { ListExpenseViewModel } from "./models/list-expense.view-model";
import { ViewExpenseViewModel } from "./models/view-expense.view-model";
import { ExpensesService } from "./services/expense.service";
import { EditExpenseComponent } from "./edit-expense/edit-expense.component";

const formsExpenseResolver: ResolveFn<FormExpenseViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(ExpensesService).selectById(route.paramMap.get('id')!);
};

const listExpenseResolver: ResolveFn<ListExpenseViewModel[]> = () => {
    return inject(ExpensesService).getAll();
}

const viewExpenseResolver: ResolveFn<ViewExpenseViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(ExpensesService).selectFullExpenseById(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListExpensesComponent,
        resolve: { expenses: listExpenseResolver }
    },
    {
        path: 'add',
        component: AddExpenseComponent,
    },
    {
        path: 'edit/:id',
        component: EditExpenseComponent,
        resolve: { expenses: formsExpenseResolver }
    },
    {
        path: 'delete/:id',
        component: DeleteExpenseComponent,
        resolve: { expenses: viewExpenseResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpensesRoutingModule {}