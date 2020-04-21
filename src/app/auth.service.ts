import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    hasToken(): boolean {
        return "token" in localStorage;
    }
}
