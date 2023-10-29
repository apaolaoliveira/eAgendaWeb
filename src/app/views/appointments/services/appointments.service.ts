import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormAppointmentViewModel } from "../models/form-appointment.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { ListAppointmentViewModel } from "../models/list-appointment.view-module";
import { ViewAppointmentViewModel } from "../models/view-appointment.view-model";

@Injectable()
export class AppointmentsService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/compromissos/';

    constructor(
        private http: HttpClient
    ){}

    public add(appointment: FormAppointmentViewModel): Observable<FormAppointmentViewModel>{
        return this.http
        .post<any>(this.endpoint, appointment)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, contact: FormAppointmentViewModel): Observable<FormAppointmentViewModel> {
        return this.http
        .put<any>(this.endpoint + id, contact)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public delete(id: string): Observable<any> {
        return this.http
        .delete(this.endpoint + id)
        .pipe(
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectById(id: string): Observable<FormAppointmentViewModel>{
        return this.http
        .get<any>(this.endpoint + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListAppointmentViewModel[]>{
        return this.http
        .get<any>(this.endpoint)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullAppointmentById(id: string): Observable<ViewAppointmentViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public pastFilter(): Observable<ListAppointmentViewModel[]>{
        return this.http
        .get<any>(this.endpoint + `passados/${new Date().toISOString()}`)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public presentFilter(): Observable<ListAppointmentViewModel[]>{
        return this.http
        .get<any>(this.endpoint + "hoje")
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public futureFilter(startDate: string, endDate: string): Observable<ListAppointmentViewModel[]>{
        return this.http
        .get<any>(this.endpoint + `futuros/${startDate}=${endDate}`)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    processErrorHttp(err: HttpErrorResponse){
        let message = '';

        if(err.status == 0)
            message = 'An error occurred while processing the request.';

        if(err.status == 401)
            message = 'User not authorized, please log in and try again.'
        else message = err.error?.erros[0];

        return throwError(() => new Error(message));
    }
}