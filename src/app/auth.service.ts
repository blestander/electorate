import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DISCORD_AUTH_URL, DISCORD_CLIENT_ID, DISCORD_SCOPE, TOKEN_OBTAIN_URL } from './constants';
import { tokenName } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    authorize(): void {
        // Store state and generate state key
        let state = window.btoa(window.crypto.getRandomValues(new Uint8Array(8)).toString())
        sessionStorage.setItem(state, location.href);

        // Generate redirect URI
        let redirect_uri = `${location.origin}/auth`
        let auth_url = `${DISCORD_AUTH_URL}?response_type=code&scope=${DISCORD_SCOPE}&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${state}&prompt=none`

        location.href = auth_url;
    }

    retrieveToken(code: string, state: string): void {
        // Get eventual redirect
        let redirect = sessionStorage.getItem(state);
        sessionStorage.removeItem(state);

        // If we did originate this code, get the token and redirect
        if (redirect)
            this.httpClient.post(TOKEN_OBTAIN_URL, {
                code: code,
            }, {withCredentials: true}).subscribe((response: any) => {
                //localStorage.setItem("token", response.token)
                location.replace(redirect)
            });
        else // This page should never have been loaded
            location.replace("/")
    }
}

interface TokenResponse {
    token: string
}
