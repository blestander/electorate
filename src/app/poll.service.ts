import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { GET_POLL_URL, CAST_VOTE_URL, FINISH_POLL_URL, CREATE_POLL_URL, LIST_POLLS_URL, GET_VOTERS_URL, WEBHOOK_URL } from './constants';
import { DELETE_POLL_URL, GET_HISTORY_URL } from './constants';
import { tap } from 'rxjs/operators';
import { Poll } from './poll';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(
        private auth: AuthService,
        private http: HttpClient,
        private router: Router,
    ) { }

    getPoll(id: string): Observable<Poll> {
        return this.http.get(
            `${GET_POLL_URL}/${id}`,
            {withCredentials: true}
        ).pipe(
            tap({
                error: this.checkLoggedIn()
            })
        );
    }

    castVote(id: string, choice, guild_proof: string): Observable<Poll> {
        return this.http.post<Poll>(
            CAST_VOTE_URL.replace("{id}", id),
            {
                choice: choice,
                guild_proof: guild_proof
            },
            {withCredentials: true}
        ).pipe(
            tap({
                error: this.checkLoggedIn()
            })
        );
    }

    finishPoll(id: string): Observable<Poll> {
        return this.http.post<Poll>(
            FINISH_POLL_URL.replace("{id}", id),
            {},
            {withCredentials: true}
        ).pipe(
            tap({
                error: this.checkLoggedIn()
            })
        );
    }

    createPoll(poll: Poll) {
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
                else if (err.status == 401) {
                    window.alert("Your login has expired. The page will now reload.");
                    location.reload();
                } else if (err.status == 403)
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

    listPolls(): Observable<Poll[]> {
        return this.http.get<Poll[]>(
            LIST_POLLS_URL,
            {withCredentials: true}
        ).pipe(tap({
            error: this.checkLoggedIn()
        }));
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
        ).pipe(tap({error:this.checkLoggedIn()}));
    }

    getVoters(id: string): Observable<any[]> {
        return this.http.get<any[]>(
            GET_VOTERS_URL.replace("{id}", id),
            { withCredentials: true }
        ).pipe(tap({error:this.checkLoggedIn()}));
    }

    setWebhook(id: string, webhook: string): Observable<any> {
        return this.http.post<any>(
            WEBHOOK_URL.replace("{id}", id),
            { webhook: webhook },
            { withCredentials: true }
        );
    }

    removeWebhook(id: string): Observable<any> {
        return this.http.delete<any>(
            WEBHOOK_URL.replace("{id}", id),
            { withCredentials: true }
        );
    }

    private checkLoggedIn() {
        return (err) => {
            try {
                if (err.status == 401)
                    this.auth.reportLoginStatus(false);
            } catch (e) {
                console.error(e);
            }
        };
    }
}
