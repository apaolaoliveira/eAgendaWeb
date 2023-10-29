import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { FormTaskViewModel } from "../models/form-task.view-model";
import { ListTaskViewModel } from "../models/list-task.view-model";
import { ViewTaskViewModel } from "../models/view-task.view-model";

@Injectable()
export class TasksService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/tarefas/';

    constructor(
        private http: HttpClient
    ){}

    public add(task: FormTaskViewModel): Observable<FormTaskViewModel> {
        return this.http
        .post<any>(this.endpoint, task)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, task: FormTaskViewModel): Observable<FormTaskViewModel> {
        return this.http
        .put<any>(this.endpoint + id, task)
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

    public selectById(id: string): Observable<FormTaskViewModel> {
        return this.http
        .get<any>(this.endpoint + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListTaskViewModel[]>{
        return this.http
        .get<any>(this.endpoint)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullTaskById(id: string): Observable<ViewTaskViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id)
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