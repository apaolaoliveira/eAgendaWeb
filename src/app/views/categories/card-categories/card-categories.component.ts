import { Component, Input } from '@angular/core';
import { ListCategoryViewModel } from '../models/list-category.view-model';

@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html'
})
export class CardCategoriesComponent {
  @Input({ required: true }) category!: ListCategoryViewModel;
  @Input({ required: true }) isListScreen!: boolean;
}
