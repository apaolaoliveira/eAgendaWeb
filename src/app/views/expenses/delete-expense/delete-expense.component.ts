import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ListExpenseViewModel } from '../models/list-expense.view-model';
import { ExpensesService } from '../services/expense.service';

@Component({
  selector: 'app-delete-expense',
  templateUrl: './delete-expense.component.html'
})
export class DeleteExpenseComponent implements OnInit{
  expenseVM!: ListExpenseViewModel;

  constructor(
    private expenseService: ExpensesService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['expenses'])).subscribe({
      next: (expenses) => this.getAppointments(expenses),
      error: (err) => this.processFailure(err)
    });
  }

  save(){
    this.expenseService.delete(this.expenseVM.id).subscribe({
      next: () => this.processSuccess(),
      error: (err) => this.processFailure(err)
    });
  }
  
  getAppointments(expenses: any): void {
    this.expenseVM = expenses;
  }
  
  processSuccess(){
    this.toast.success('The expense was deleted.', 'Success!');
    this.router.navigate(['/expenses/list']);
  }
  
  processFailure(err: Error): void {
    this.toast.error(err.message, 'Erro!');
  }
}
