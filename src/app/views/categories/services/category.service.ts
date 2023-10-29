import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { FormCategoryViewModel } from "../models/form-category.view-model";
import { ListCategoryViewModel } from "../models/list-category.view-model";
import { ViewCategoryViewModel } from "../models/view-category.view-model";

@Injectable()
export class CategoriesService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/categorias/';

    constructor(
        private http: HttpClient
    ){}

    public add(category: FormCategoryViewModel): Observable<FormCategoryViewModel> {
        return this.http
        .post<any>(this.endpoint, category)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public edit(id: string, category: FormCategoryViewModel): Observable<FormCategoryViewModel> {
        return this.http
        .put<any>(this.endpoint + id, category)
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

    public selectById(id: string): Observable<FormCategoryViewModel> {
        return this.http
        .get<any>(this.endpoint + id)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public getAll(): Observable<ListCategoryViewModel[]>{
        return this.http
        .get<any>(this.endpoint)
        .pipe(
            map((res) => res.dados),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public selectFullCategoryById(id: string): Observable<ViewCategoryViewModel> {
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