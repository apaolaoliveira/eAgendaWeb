import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, map, throwError } from "rxjs";
import { FormContactViewModel } from "../models/form-contact.view-model";
import { ListContactViewModel } from "../models/list-contact.view-model";
import { ViewContactViewModel } from "../models/view-contact.view-model";

@Injectable()
export class ContactsService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos/';

    constructor(
        private http: HttpClient
    ){}

    public add(contact: FormContactViewModel): Observable<FormContactViewModel> {
        return this.http
        .post<any>(this.endpoint, contact)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, contact: FormContactViewModel): Observable<FormContactViewModel> {
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

    public selectById(id: string): Observable<FormContactViewModel> {
        return this.http
        .get<any>(this.endpoint + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListContactViewModel[]>{
        return this.http
        .get<any>(this.endpoint)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullContactById(id: string): Observable<ViewContactViewModel> {
        return this.http
        .get<any>(this.endpoint + 'visualizacao-completa/' + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public updateFavorite(id: string): Observable<ListContactViewModel>{
        return this.http
        .put<any>(this.endpoint + 'favoritos/' + id, {})
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