import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpensesService } from '../services/expense.service';
import { ViewExpenseViewModel } from '../models/view-expense.view-model';
import { ListExpenseViewModel } from '../models/list-expense.view-model';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html'
})
export class ListExpensesComponent implements OnInit{
  expenses: ListExpenseViewModel[] = [];
  selectedFilter: string = '';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpensesService
  ){}

  ngOnInit(): void {
    this.expenses = this.route.snapshot.data['expenses'];
    this.selectedFilter = 'all';
  }
  
  getAllExpenses(){
    this.selectedFilter = 'all';
    this.expenseService.getAll().subscribe((res) => this.expenses = res);
  }
  
  filterOldExpenses(){
    this.selectedFilter = 'old';
    this.expenseService.selectOldExpenses().subscribe((res) => this.expenses = res);
  }
  
  filterPastExpenses(){
    this.selectedFilter = 'past';
    this.expenseService.selectPastMonth().subscribe((res) => this.expenses = res);
  }

}
