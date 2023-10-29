import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const loginGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
    const router = inject(Router);

    return inject(AuthService).getAuthUser()
    .pipe(
        map(user => {
        if(user) return router.parseUrl('/dashboard');
        return true;
    })
    )
}