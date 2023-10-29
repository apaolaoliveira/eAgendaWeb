import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class localStorageService {
    private localStorageKey: string = 'eAgendaData';

    public saveLocalData(user: TokenViewModel){
        const jsonString = JSON.stringify(user);

        localStorage.setItem(this.localStorageKey, jsonString);
    }

    public getLocalData(): TokenViewModel | undefined {
        const jsonString = localStorage.getItem(this.localStorageKey);

        if(!jsonString) return undefined;

        else return JSON.parse(jsonString) as TokenViewModel;
    }

    public deleteLocalData(): void{
        localStorage.setItem(this.localStorageKey, '');
    }
}