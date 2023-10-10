import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddContactComponent } from './views/contacts/add-contact/add-contact.component';
import { ListContactsComponent } from './views/contacts/list-contacts/list-contacts.component';

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
    path: 'contacts/add',
    component: AddContactComponent
  },
  {
    path: 'contacts/list',
    component: ListContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
