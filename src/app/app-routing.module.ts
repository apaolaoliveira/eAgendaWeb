import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

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
    path: 'contacts',
    loadChildren: () => 
    import('./views/contacts/contacts.module').then((m) => m.ContactsModule)
  },
  {
    path: 'appointments',
    loadChildren: () => 
    import('./views/appointments/appointments.module').then((m) => m.AppointmentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
