import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { SignUpUserViewModel } from "../models/signup-user.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { localStorageService } from "./local-storage.service";
import { LoginUserViewModel } from "../models/login-user.view-model";
import { UserTokenViewModel } from "../models/user-token.view-model";

@Injectable()
export class AuthService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

    private endpointSignUp: string = this.endpoint + 'registrar';
    private endpointLogin: string = this.endpoint + 'autenticar';

    private authUser: BehaviorSubject<UserTokenViewModel | undefined>;

    constructor(
        private http: HttpClient,
        private localStorage: localStorageService
    ){
        this.authUser = new BehaviorSubject<UserTokenViewModel | undefined>(undefined);
    }

    public getAuthUser(){
        return this.authUser.asObservable();
    }

    public signUpUser(user: SignUpUserViewModel): Observable<TokenViewModel>{
        return this.http
        .post<any>(this.endpointSignUp, user)
        .pipe(
            map((res) => res.dados),
            tap((data: TokenViewModel) => this.localStorage.saveLocalData(data)),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    public login(user: LoginUserViewModel): Observable<TokenViewModel>{
        return this.http
        .post<any>(this.endpointLogin, user)
        .pipe(
            map((res) => res.dados),
            tap((data: TokenViewModel) => this.localStorage.saveLocalData(data)),
            tap((data: TokenViewModel) => this.loginNotifier(data.usuarioToken)),
            catchError((err: HttpErrorResponse) => this.processErrorHttp(err))
        );
    }

    private loginNotifier(user: UserTokenViewModel): void{
        this.authUser.next(user);
    }

    private logOutNotifier(): void{
        this.authUser.next(undefined);
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