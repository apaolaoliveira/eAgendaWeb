import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FormContactViewModel } from "../models/form-contact.view-model";

@Injectable()
export class ContactsService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/contatos';

    constructor(
        private http: HttpClient
    ){}

    public create(contact: FormContactViewModel): Observable<FormContactViewModel> {
        return this.http.post<any>(this.endpoint, contact, this.getAuthorization());
    }

    private getAuthorization(){
        const token = environment.apiKey;

        return {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        }
    }
}