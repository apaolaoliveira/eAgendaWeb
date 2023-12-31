import { NgModule, inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, Routes, RouterModule } from "@angular/router";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { DeleteContactComponent } from "./delete-contact/delete-contact.component";
import { EditContactComponent } from "./edit-contact/edit-contact.component";
import { ListContactsComponent } from "./list-contacts/list-contacts.component";
import { FormContactViewModel } from "./models/form-contact.view-model";
import { ListContactViewModel } from "./models/list-contact.view-model";
import { ContactsService } from "./services/contacts.service";
import { ViewContactViewModel } from "./models/view-contact.view-model";

const formsContactResolver: ResolveFn<FormContactViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(ContactsService).selectById(route.paramMap.get('id')!);
};

const listContactResolver: ResolveFn<ListContactViewModel[]> = () => {
    return inject(ContactsService).getAll();
}

const viewContactResolver: ResolveFn<ViewContactViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(ContactsService).selectFullContactById(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListContactsComponent,
        resolve: { contacts: listContactResolver }
    },
    {
        path: 'add',
        component: AddContactComponent,
    },
    {
        path: 'edit/:id',
        component: EditContactComponent,
        resolve: { contacts: formsContactResolver }
    },
    {
        path: 'delete/:id',
        component: DeleteContactComponent,
        resolve: { contacts: viewContactResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule {}