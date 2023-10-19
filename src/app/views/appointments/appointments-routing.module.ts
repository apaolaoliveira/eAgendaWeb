import { inject, NgModule } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, Routes, RouterModule } from "@angular/router";
import { AddAppointmentComponent } from "./add-appointment/add-appointment.component";
import { DeleteAppointmentComponent } from "./delete-appointment/delete-appointment.component";
import { EditAppointmentComponent } from "./edit-appointment/edit-appointment.component";
import { ListAppointmentComponent } from "./list-appointment/list-appointment.component";
import { FormAppointmentViewModel } from "./models/form-appointment.view-model";
import { ListAppointmentViewModel } from "./models/list-appointment.view-module";
import { AppointmentsService } from "./services/appointments.service";
import { ViewAppointmentViewModel } from "./models/view-appointment.view-model";

const formsAppointmentResolver: ResolveFn<FormAppointmentViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(AppointmentsService).selectById(route.paramMap.get('id')!);
};

const listAppointmentResolver: ResolveFn<ListAppointmentViewModel[]> = () => {
    return inject(AppointmentsService).getAll();
}

const viewAppointmentResolver: ResolveFn<ViewAppointmentViewModel> = (
    route: ActivatedRouteSnapshot
) => {
    return inject(AppointmentsService).selectFullAppointmentById(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListAppointmentComponent,
        resolve: { appointment: listAppointmentResolver }
    },
    {
        path: 'add',
        component: AddAppointmentComponent
    },
    {
        path: 'edit/:id',
        component: EditAppointmentComponent,
        resolve: { appointment: formsAppointmentResolver }
    },
    {
        path: 'delete/:id',
        component: DeleteAppointmentComponent,
        resolve: { appointment: viewAppointmentResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule { }