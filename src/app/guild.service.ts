import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_GUILDS_URL } from './constants';

@Injectable({
    providedIn: 'root'
})
export class GuildService {

    constructor(private http: HttpClient) { }

    getGuilds(): Observable<any[]> {
        return this.http.get<any[]>(
            GET_GUILDS_URL,
            {withCredentials: true}
        );
    }
}
