import { Component, OnInit } from '@angular/core';
import { ListCategoryViewModel } from '../models/list-category.view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { CategoriesService } from '../services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html'
})
export class DeleteCategoryComponent implements OnInit{
  categoryVM!: ListCategoryViewModel;

  constructor(
    private categoryService: CategoriesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['categories'])).subscribe({
      next: (categories) => this.getCategories(categories),
      error: (err) => this.processFailure(err)
    });
  }

  save(){
    this.categoryService.delete(this.categoryVM.id).subscribe({
      next: () => this.processSuccess(),
      error: (err: Error) => this.processFailure(err)     
    });
  }

  getCategories(categories: ListCategoryViewModel): void {
    this.categoryVM = categories;
  }

  processSuccess(){
    this.toast.success('The category was deleted.', 'Success!');
    this.router.navigate(['/categories/list']);
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
