import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { localStorageService } from "../local-storage.service";

export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const token = inject(localStorageService).getLocalData()?.chave;
    
    const modifiedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(modifiedRequest);
}