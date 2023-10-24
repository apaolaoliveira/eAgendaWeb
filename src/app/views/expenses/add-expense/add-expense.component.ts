import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../services/expense.service';
import { ListCategoryViewModel } from '../../categories/models/list-category.view-model';
import { CategoriesService } from '../../categories/services/category.service';
import { FormExpenseViewModel } from '../models/form-expense.view-model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent implements OnInit{
  form!: FormGroup;
  categories: ListCategoryViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpensesService,
    private categoryService: CategoriesService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      valor: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      data: new FormControl(new Date(), [Validators.required]),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required])
    });

    this.categoryService.getAll().subscribe((res) => this.categories = res);
  }
  
  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  save(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.expenseService.add(this.form.value).subscribe({
      next: (expense: FormExpenseViewModel) => this.processSuccess(expense),
      error: (err: Error) => this.processFailure(err)
    })
  }

  processSuccess(expense: FormExpenseViewModel){
    this.toast.success(`${expense.descricao} was added to your list.`, 'Success!');
    this.router.navigate(['/expenses/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
