import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-expenses',
  templateUrl: './card-expenses.component.html'
})
export class CardExpensesComponent {
  @Input({ required: true }) expense!: string;
  @Input({ required: true }) isListScreen!: boolean;
}
