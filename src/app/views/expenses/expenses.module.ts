import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { DeleteExpenseComponent } from './delete-expense/delete-expense.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { CardExpensesComponent } from './card-expenses/card-expenses.component';



@NgModule({
  declarations: [
    AddExpenseComponent,
    EditExpenseComponent,
    DeleteExpenseComponent,
    ListExpensesComponent,
    CardExpensesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExpensesModule { }
