import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_GUILDS_URL } from './constants';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GuildService {

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) { }

    getGuilds(): Observable<any[]> {
        return this.http.get<any[]>(
            GET_GUILDS_URL,
            {withCredentials: true}
        ).pipe(tap({error: err => {
            if (err.status == 401)
                this.auth.reportLoginStatus(false);
        }}));
    }
}
