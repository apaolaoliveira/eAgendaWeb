import { Component, Input } from '@angular/core';
import { ListExpenseViewModel } from '../models/list-expense.view-model';

@Component({
  selector: 'app-card-expenses',
  templateUrl: './card-expenses.component.html'
})
export class CardExpensesComponent {
  @Input({ required: true }) expense!: ListExpenseViewModel;
  @Input({ required: true }) isListScreen!: boolean;
}
