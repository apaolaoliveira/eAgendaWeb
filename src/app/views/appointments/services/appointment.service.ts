// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";

// @Injectable()
// export class AppointmentService {
//     private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/compromissos/';

//     constructor(
//         private http: HttpClient
//     ){}

//     public add(contact: FormContactViewModel): Observable<FormContactViewModel> {
//         return this.http
//         .post<any>(this.endpoint, contact, this.getAuthorization());
//     }

//     public edit(id: string, contact: FormContactViewModel): Observable<FormContactViewModel> {
//         return this.http
//         .put<any>(this.endpoint + id, contact, this.getAuthorization())
//         .pipe(map((res) => res.dados));
//     }

//     public delete(id: string): Observable<any> {
//         return this.http
//         .delete(this.endpoint + id, this.getAuthorization());
//     }

//     public getAll(): Observable<ListContactViewModel[]>{
//         return this.http
//         .get<any>(this.endpoint, this.getAuthorization())
//         .pipe(map((res) => res.dados));
//     }

//     public selectById(id: string): Observable<FormContactViewModel> {
//         return this.http
//         .get<any>(this.endpoint + id, this.getAuthorization())
//         .pipe(map((res) => res.dados));
//     }

//     public selectFullContactById(id: string): Observable<ViewContactViewModel> {
//         return this.http
//         .get<any>(this.endpoint + 'visualizacao-completa/' + id, this.getAuthorization())
//         .pipe(map((res) => res.dados));
//     }

//     private getAuthorization(){
//         const token = environment.apiKey;

//         return {
//             headers: new HttpHeaders({
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             })
//         };
//     }
// }