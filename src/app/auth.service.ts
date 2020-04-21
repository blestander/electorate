import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DISCORD_AUTH_URL, DISCORD_CLIENT_ID, DISCORD_SCOPE, TOKEN_OBTAIN_URL } from './constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    hasToken(): boolean {
        return "token" in localStorage;
    }

    authorize(): void {
        // Store state and generate state key
        let state = "alpha"
        sessionStorage.setItem(state, location.href);

        // Generate redirect URI
        let redirect_uri = `${location.origin}/auth`
        let auth_url = `${DISCORD_AUTH_URL}?response_type=code&scope=${DISCORD_SCOPE}&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${state}&prompt=none`

        location.href = auth_url;
    }

    retrieveToken(code: string, state: string): void {
        this.httpClient.post(TOKEN_OBTAIN_URL, {
            code: code,
        }, {}).subscribe(response => {
            console.log(response);
        })
    }
}
