import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormExpenseViewModel } from "../models/form-expense.view-model";
import { ListExpenseViewModel } from "../models/list-expense.view-model";
import { ViewExpenseViewModel } from "../models/view-expense.view-model";
import { localStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class ExpensesService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas/';

    constructor(
        private http: HttpClient,
        private localStorage: localStorageService
    ){}

    public add(expense: FormExpenseViewModel): Observable<FormExpenseViewModel> {
        return this.http
        .post<any>(this.endpoint, expense, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, expense: FormExpenseViewModel): Observable<FormExpenseViewModel> {
        return this.http
        .put<any>(this.endpoint + id, expense, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public delete(id: string): Observable<any> {
        return this.http
        .delete(this.endpoint + id, this.getAuthorization())
        .pipe(
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectById(id: string): Observable<FormExpenseViewModel> {
        return this.http
        .get<any>(this.endpoint + id, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>(this.endpoint, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullExpenseById(id: string): Observable<ViewExpenseViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectOldExpenses(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>(this.endpoint + 'antigas', this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((erro: HttpErrorResponse) => this.processErrorHttp(erro))
        );
    }

    public selectPastMonth(): Observable<ListExpenseViewModel[]>{
        return this.http
        .get<any>( this.endpoint + 'ultimos-30-dias', this.getAuthorization())
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

    private getAuthorization(){
        const token = this.localStorage.getLocalData()?.chave;

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        };
    }
}