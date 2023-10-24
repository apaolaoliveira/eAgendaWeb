import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { DeleteExpenseComponent } from './delete-expense/delete-expense.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { CardExpensesComponent } from './card-expenses/card-expenses.component';
import { ExpensesService } from './services/expense.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { CategoriesModule } from '../categories/categories.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    AddExpenseComponent,
    EditExpenseComponent,
    DeleteExpenseComponent,
    ListExpensesComponent,
    CardExpensesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ExpensesRoutingModule,
    CategoriesModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    ExpensesService
  ]
})
export class ExpensesModule { }
