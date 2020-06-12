import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DISCORD_AUTH_URL, DISCORD_CLIENT_ID, DISCORD_SCOPE, TOKEN_OBTAIN_URL, LOGOUT_URL, CHECK_LOGIN_URL } from './constants';
import { environment } from './../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginStatus = new BehaviorSubject<boolean>(true);

    constructor(private httpClient: HttpClient) { }

    authorize(remember: boolean): void {
        // Store state and generate state key
        let state = window.btoa(window.crypto.getRandomValues(new Uint8Array(8)).toString())
        sessionStorage.setItem(state, JSON.stringify({
            redirect: location.href,
            remember: remember
        }));

        // Generate redirect URI
        let redirect_uri = environment.production ? `${location.origin}/auth` : `${location.origin}/auth`
        let auth_url = `${DISCORD_AUTH_URL}?response_type=code&scope=${DISCORD_SCOPE}&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${state}&prompt=none`

        location.href = auth_url;
    }

    retrieveToken(code: string, state: string): void {
        // Get eventual redirect
        let { redirect, remember } = JSON.parse(sessionStorage.getItem(state));
        sessionStorage.removeItem(state);

        // If we did originate this code, get the token and redirect
        if (redirect)
            this.httpClient.post(TOKEN_OBTAIN_URL, {
                code: code,
                remember: remember
            }, {withCredentials: true}).subscribe((response: any) => {
                //localStorage.setItem("token", response.token)
                this.loginStatus.next(true);
                location.replace(redirect);
            });
        else // This page should never have been loaded
            location.replace("/")
    }

    logout(): void {
        this.httpClient.get(
            LOGOUT_URL,
            {withCredentials: true}
        ).subscribe(
            () => location.reload()
        );
    }

    checkLogin(): Observable<boolean> {
        return this.httpClient.get(
            CHECK_LOGIN_URL,
            {withCredentials: true}
        ).pipe(map(
            o => true
        )).pipe(catchError(
            err => {
                if (err.status == 401)
                    return of(false);
            }
        ));
    }

    reportLoginStatus(status: boolean) {
        this.loginStatus.next(status);
    }
}

interface TokenResponse {
    token: string
}
