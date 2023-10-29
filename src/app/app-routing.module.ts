import { NgModule } from '@angular/core';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contacts',
    loadChildren: () => 
    import('./views/contacts/contacts.module').then((m) => m.ContactsModule),
    canActivate: [authGuard]
  },
  {
    path: 'appointments',
    loadChildren: () => 
    import('./views/appointments/appointments.module').then((m) => m.AppointmentsModule),
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadChildren: () => 
    import('./views/categories/categories.module').then((m) => m.CategoriesModule),
    canActivate: [authGuard]
  },
  {
    path: 'expenses',
    loadChildren: () => 
    import('./views/expenses/expenses.module').then((m) => m.ExpensesModule),
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => 
    import('./views/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [authGuard]
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
