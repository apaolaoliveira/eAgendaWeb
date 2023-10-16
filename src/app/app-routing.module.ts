import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddContactComponent } from './views/contacts/add-contact/add-contact.component';
import { ListContactsComponent } from './views/contacts/list-contacts/list-contacts.component';
import { EditContactComponent } from './views/contacts/edit-contact/edit-contact.component';
import { DeleteContactComponent } from './views/contacts/delete-contact/delete-contact.component';
import { ListAppointmentComponent } from './views/appointments/list-appointment/list-appointment.component';
import { AddAppointmentComponent } from './views/appointments/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './views/appointments/edit-appointment/edit-appointment.component';
import { DeleteAppointmentComponent } from './views/appointments/delete-appointment/delete-appointment.component';

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

  // contacts
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
  },

  // appointments
  {
    path: 'appointments/list',
    component: ListAppointmentComponent
  },
  {
    path: 'appointments/add',
    component: AddAppointmentComponent
  },
  {
    path: 'appointments/edit/:id',
    component: EditAppointmentComponent
  },
  {
    path: 'appointments/delete/:id',
    component: DeleteAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
