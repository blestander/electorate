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

    getPoll(id: string): Observable<unknown> {
        return this.http.get(GET_POLL_URL, {
            params: {
                token: this.auth.getToken(),
                id: id
            }
        })
    }

    castVote(id: string, choice: string | string[]): Observable<unknown> {
        return this.http.post(
            CAST_VOTE_URL,
            {
                token: this.auth.getToken(),
                id: id,
                choice: choice
            }
        );
    }
}
