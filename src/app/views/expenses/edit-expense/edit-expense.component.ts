import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListCategoryViewModel } from '../../categories/models/list-category.view-model';
import { CategoriesService } from '../../categories/services/category.service';
import { FormExpenseViewModel } from '../models/form-expense.view-model';
import { ExpensesService } from '../services/expense.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html'
})
export class EditExpenseComponent implements OnInit{
  form!: FormGroup;
  expenseVM!: FormExpenseViewModel;
  categories: ListCategoryViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpensesService,
    private categoryService: CategoriesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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

    this.route.data.pipe(map((data) => data['expenses'])).subscribe({
      next: (expenses) => this.getExpenses(expenses),
      error: (err) => this.processFailure(err)
    });
  }
  validateField(name: string){
    return this.form.get(name)!.touched && this.form.get(name)!.invalid;
  }

  save(){
    if (this.form.invalid) {
      for(let error of this.form.validate()) this.toast.warning(error);
      return;
    }

    this.expenseVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;

    this.expenseService.edit(id, this.expenseVM).subscribe({
      next: (expenses: FormExpenseViewModel) => this.processSuccess(expenses),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  getExpenses(expenses: FormExpenseViewModel): void {
    this.expenseVM = expenses;
    this.form.patchValue(this.expenseVM);

    const dateFormat = this.expenseVM.data.toString().substring(0, 10);
    this.form.patchValue({ data: dateFormat });
  }

  processSuccess(category: FormExpenseViewModel){
    this.toast.success(`${category.descricao}'s info was edited.`, 'Success!');
    this.router.navigate(['/expenses/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
