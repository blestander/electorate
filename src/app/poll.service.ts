import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { GET_POLL_URL, CAST_VOTE_URL, FINISH_POLL_URL, CREATE_POLL_URL, LIST_POLLS_URL } from './constants';
import { DELETE_POLL_URL, GET_HISTORY_URL } from './constants';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(
        private auth: AuthService,
        private http: HttpClient,
        private router: Router,
    ) { }

    getPoll(id: string): Observable<any> {
        return this.http.get(
            `${GET_POLL_URL}/${id}`,
            {withCredentials: true})
    }

    castVote(id: string, choice): Observable<Object> {
        return this.http.post<Object>(
            CAST_VOTE_URL.replace("{id}", id),
            {
                choice: choice
            },
            {withCredentials: true}
        );
    }

    finishPoll(id: string): Observable<Object> {
        return this.http.post<Object>(
            FINISH_POLL_URL.replace("{id}", id),
            {},
            {withCredentials: true}
        );
    }

    createPoll(poll: object) {
        this.http.post<any>(
            CREATE_POLL_URL,
            poll,
            {withCredentials: true}
        ).subscribe({
            next: o => this.router.navigateByUrl(`/poll/${o.id}`),
            error: err => console.error(`${err.status}: ${err.error}`)
        });
    }

    listPolls() {
        return this.http.get<any[]>(
            LIST_POLLS_URL,
            {withCredentials: true}
        );
    }

    deletePoll(id: string) {
        this.http.delete<void>(
            `${DELETE_POLL_URL}/${id}`,
            {withCredentials: true}
        ).subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: err => console.error(`${err.status}: ${err.error}`)
        })
    }

    getHistory() {
        return this.http.get(
            GET_HISTORY_URL,
            { withCredentials: true }
        );
    }
}
