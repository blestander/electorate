import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { GET_POLL_URL, CAST_VOTE_URL } from './constants';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(
        private auth: AuthService,
        private http: HttpClient,
    ) { }

    getPoll(id: string): Observable<any> {
        return this.http.get(GET_POLL_URL, {
            params: {
                token: this.auth.getToken(),
                id: id
            },
            withCredentials: true
        })
    }

    castVote(id: string, choice: string | string[]): Observable<Object> {
        return this.http.post<Object>(
            CAST_VOTE_URL,
            {
                token: this.auth.getToken(),
                id: id,
                choice: choice
            },
            {withCredentials: true}
        );
    }
}
