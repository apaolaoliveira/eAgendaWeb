import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormCategoryViewModel } from '../models/form-category.view-model';
import { CategoriesService } from '../services/category.service';
import { map } from 'rxjs';
import { ViewCategoryViewModel } from '../models/view-category.view-model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnInit{
  form!: FormGroup;
  categoryVM!: FormCategoryViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
    });

    this.route.data.pipe(map((data) => data['categories'])).subscribe({
      next: (categories) => this.getCategories(categories),
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

    this.categoryVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;

    this.categoryService.edit(id, this.categoryVM).subscribe({
      next: (category: FormCategoryViewModel) => this.processSuccess(category),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  getCategories(categories: ViewCategoryViewModel): void {
    this.categoryVM = categories;
    this.form.patchValue(this.categoryVM);
  }

  processSuccess(category: FormCategoryViewModel){
    this.toast.success(`${category.titulo}'s info was edited.`, 'Success!');
    this.router.navigate(['/categories/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
