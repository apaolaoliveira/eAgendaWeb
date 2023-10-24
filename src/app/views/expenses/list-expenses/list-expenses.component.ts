import { Component, OnInit } from '@angular/core';
import { ListExpenseViewModel } from '../models/list-expense.view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html'
})
export class ListExpensesComponent implements OnInit{
  expenses: ListExpenseViewModel[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.expenses = this.route.snapshot.data['expenses'];
  }
}
