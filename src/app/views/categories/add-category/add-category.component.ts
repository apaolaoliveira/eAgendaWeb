import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../services/category.service';
import { FormCategoryViewModel } from '../models/form-category.view-model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
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


    this.categoryService.add(this.form.value).subscribe({
      next: (category: FormCategoryViewModel) => this.processSuccess(category),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  processSuccess(category: FormCategoryViewModel){
    this.toast.success(`${category.titulo} was added to your list.`, 'Success!');
    this.router.navigate(['/categories/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
