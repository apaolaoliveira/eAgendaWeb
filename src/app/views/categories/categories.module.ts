import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { CardCategoriesComponent } from './card-categories/card-categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';



@NgModule({
  declarations: [
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    CardCategoriesComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriesModule { }
