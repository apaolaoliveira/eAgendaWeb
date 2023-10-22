import { Component } from '@angular/core';
import { ListCategoryViewModel } from '../models/list-category.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html'
})
export class ListCategoriesComponent {
  categories: ListCategoryViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService
  ){}

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['categories'])).subscribe({
      next: (category) => this.getCategories(category),
      error: (err) => this.processFailure(err)
    });
  }

  getCategories(category: ListCategoryViewModel[]){
    this.categories = category;
  }

  processFailure(error: Error){
    this.toast.error(error.message, 'Error!');
  }
}
