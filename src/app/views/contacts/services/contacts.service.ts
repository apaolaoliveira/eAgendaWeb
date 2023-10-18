import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormContactViewModel } from "../models/form-contact.view-model";
import { ListContactViewModel } from "../models/list-contact.view-model";

@Injectable()
export class ContactsService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos/';

    constructor(
        private http: HttpClient
    ){}

    public add(contact: FormContactViewModel): Observable<FormContactViewModel> {
        return this.http
        .post<any>(this.endpoint, contact, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, contact: FormContactViewModel): Observable<FormContactViewModel> {
        return this.http
        .put<any>(this.endpoint + id, contact, this.getAuthorization())
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

    public selectById(id: string): Observable<FormContactViewModel> {
        return this.http
        .get<any>(this.endpoint + id, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListContactViewModel[]>{
        return this.http
        .get<any>(this.endpoint, this.getAuthorization())
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullContactById(id: string): Observable<ListContactViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id, this.getAuthorization())
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

    private getAuthorization(){
        const token = environment.apiKey;

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        };
    }
}