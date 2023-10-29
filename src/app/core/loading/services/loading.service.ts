import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class loadingService {
    private isLoading = new BehaviorSubject<boolean>(false);

    public getLoadingStatus(): Observable<boolean>{
        return this.isLoading.asObservable();
    }

    public upload(){
        this.isLoading.next(true);
    }

    public stop(){
        this.isLoading.next(false);
    }
}