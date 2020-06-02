import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { GET_POLL_URL, CAST_VOTE_URL, FINISH_POLL_URL, CREATE_POLL_URL, LIST_POLLS_URL, GET_VOTERS_URL } from './constants';
import { DELETE_POLL_URL, GET_HISTORY_URL } from './constants';
import { tap } from 'rxjs/operators';

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
            {withCredentials: true}
        ).pipe(tap({error:this.checkLoggedIn}));
    }

    castVote(id: string, choice, guild_proof: string): Observable<Object> {
        return this.http.post<Object>(
            CAST_VOTE_URL.replace("{id}", id),
            {
                choice: choice,
                guild_proof: guild_proof
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
            {
                withCredentials: true,
                observe: 'response'
            }
        ).subscribe({
            next: res => this.router.navigateByUrl(res.headers.get('Location')),
            error: err => {
                if (err.status == 0)
                    window.alert("Unable to reach server to submit poll");
                else if (err.status == 400)
                    window.alert('Server has rejected creation request');
                else if (err.status == 401)
                    window.alert('Authentication error');
                else if (err.status == 403)
                    window.alert('Authorization error');
                else if (err.status == 404)
                    window.alert('URL error');
                else if (err.status == 500)
                    window.alert('Server error');
                else
                    window.alert(`Unknown error: Code ${err.status}`);
            }
        });
    }

    listPolls() {
        return this.http.get<any[]>(
            LIST_POLLS_URL,
            {withCredentials: true}
        ).pipe(tap({error:this.checkLoggedIn}));
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
        ).pipe(tap({error:this.checkLoggedIn}));
    }

    getVoters(id: string): Observable<any[]> {
        return this.http.get<any[]>(
            GET_VOTERS_URL.replace("{id}", id),
            { withCredentials: true }
        ).pipe(tap({error:this.checkLoggedIn}));
    }

    private checkLoggedIn(err) {
        if (err.status == 401)
            console.log("Not logged in");
    }
}
