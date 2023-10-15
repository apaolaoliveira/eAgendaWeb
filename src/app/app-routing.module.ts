import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddContactComponent } from './views/contacts/add-contact/add-contact.component';
import { ListContactsComponent } from './views/contacts/list-contacts/list-contacts.component';
import { EditContactComponent } from './views/contacts/edit-contact/edit-contact.component';
import { DeleteContactComponent } from './views/contacts/delete-contact/delete-contact.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'contacts/list',
    component: ListContactsComponent
  },
  {
    path: 'contacts/add',
    component: AddContactComponent
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent
  },
  {
    path: 'contacts/delete/:id',
    component: DeleteContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
