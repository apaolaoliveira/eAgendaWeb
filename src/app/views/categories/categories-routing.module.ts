import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListCategoriesComponent } from "./list-categories/list-categories.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { DeleteCategoryComponent } from "./delete-category/delete-category.component";
import { FormCategoryViewModel } from "./models/form-category.view-model";
import { ListCategoryViewModel } from "./models/list-category.view-model";
import { ViewCategoryViewModel } from "./models/view-category.view-model";
import { CategoriesService } from "./services/category.service";

const formsCategoryResolver: ResolveFn<FormCategoryViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(CategoriesService).selectById(route.paramMap.get('id')!);
};

const listCategoryResolver: ResolveFn<ListCategoryViewModel[]> = () => {
    return inject(CategoriesService).getAll();
}

const viewCategoryResolver: ResolveFn<ViewCategoryViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(CategoriesService).selectFullCategoryById(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListCategoriesComponent,
        resolve: { categories: listCategoryResolver }
    },
    {
        path: 'add',
        component: AddCategoryComponent,
    },
    {
        path: 'edit/:id',
        component: EditCategoryComponent,
        resolve: { categories: formsCategoryResolver }
    },
    {
        path: 'delete/:id',
        component: DeleteCategoryComponent,
        resolve: { categories: viewCategoryResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule {}