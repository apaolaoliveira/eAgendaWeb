import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html'
})
export class CardCategoriesComponent {
  @Input({ required: true }) category!: string;
  @Input({ required: true }) isListScreen!: boolean;
}
