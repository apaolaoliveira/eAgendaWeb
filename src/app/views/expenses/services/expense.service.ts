import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { FormExpenseViewModel } from "../models/form-expense.view-model";
import { ListExpenseViewModel } from "../models/list-expense.view-model";
import { ViewExpenseViewModel } from "../models/view-expense.view-model";

@Injectable()
export class ExpensesService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas/';

    constructor(
        private http: HttpClient
    ){}

    public add(expense: FormExpenseViewModel): Observable<FormExpenseViewModel> {
        return this.http
        .post<any>(this.endpoint, expense)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, expense: FormExpenseViewModel): Observable<FormExpenseViewModel> {
        return this.http
        .put<any>(this.endpoint + id, expense)
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

    public selectById(id: string): Observable<FormExpenseViewModel> {
        return this.http
        .get<any>(this.endpoint + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>(this.endpoint)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullExpenseById(id: string): Observable<ViewExpenseViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectOldExpenses(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>(this.endpoint + 'antigas')
        .pipe(
            map((res) => res.dados),
            catchError((erro: HttpErrorResponse) => this.processErrorHttp(erro))
        );
    }

    public selectPastMonth(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>( this.endpoint + 'ultimos-30-dias')
        .pipe(
            map((res) => res.dados),
            catchError((erro: HttpErrorResponse) => this.processErrorHttp(erro))
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