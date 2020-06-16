import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { GET_POLL_URL, CAST_VOTE_URL, FINISH_POLL_URL, CREATE_POLL_URL, LIST_POLLS_URL, GET_VOTERS_URL, WEBHOOK_URL } from './constants';
import { DELETE_POLL_URL, GET_HISTORY_URL } from './constants';
import { tap, map } from 'rxjs/operators';
import { Poll } from './poll';
import { Voter } from './voter';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(
        private auth: AuthService,
        private http: HttpClient,
    ) { }

    getPoll(id: string): Observable<Poll> {
        return this.http.get(
            `${GET_POLL_URL}/${id}`,
            {withCredentials: true}
        ).pipe(
            tap({
                error: this.checkLoggedIn()
            })
        ).pipe(map(this.processDates))
        .pipe(tap({next: poll => console.log(poll)}));
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
        ).pipe(map(this.processDates));
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
        ).pipe(map(this.processDates));
    }

    createPoll(poll: Poll): Observable<string> {
        return this.http.post<void>(
            CREATE_POLL_URL,
            poll,
            {
                withCredentials: true,
                observe: 'response'
            }
        ).pipe(map((res: HttpResponse<void>): string => {
            return res.headers.get('Location');
        })).pipe(tap({
            error: this.checkLoggedIn()
        }));
    }

    listPolls(): Observable<Poll[]> {
        return this.http.get<Poll[]>(
            LIST_POLLS_URL,
            {withCredentials: true}
        ).pipe(tap({
            error: this.checkLoggedIn()
        })).pipe(map(this.processDatesOnArray));
    }

    deletePoll(id: string): Observable<void> {
        return this.http.delete<void>(
            `${DELETE_POLL_URL}/${id}`,
            {withCredentials: true}
        ).pipe(tap({
            error: this.checkLoggedIn()
        }));
    }

    getHistory(): Observable<Poll[]> {
        return this.http.get<Poll[]>(
            GET_HISTORY_URL,
            { withCredentials: true }
        ).pipe(tap({
            error:this.checkLoggedIn()
        })).pipe(map(this.processDatesOnArray));
    }

    getVoters(id: string): Observable<Voter[]> {
        return this.http.get<any[]>(
            GET_VOTERS_URL.replace("{id}", id),
            { withCredentials: true }
        ).pipe(tap({
            error:this.checkLoggedIn()
        }));
    }

    setWebhook(id: string, webhook: string): Observable<Poll> {
        return this.http.post<Poll>(
            WEBHOOK_URL.replace("{id}", id),
            { webhook: webhook },
            { withCredentials: true }
        ).pipe(tap({
            error: this.checkLoggedIn()
        })).pipe(map(this.processDates));
    }

    removeWebhook(id: string): Observable<Poll> {
        return this.http.delete<Poll>(
            WEBHOOK_URL.replace("{id}", id),
            { withCredentials: true }
        ).pipe(tap({
            error: this.checkLoggedIn()
        })).pipe(map(this.processDates));
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

    private processDates(poll: Poll): Poll {
        if (poll.start_time)
            poll.start_time = new Date(poll.start_time);
        if (poll.finish_time)
            poll.finish_time = new Date(poll.finish_time);
        if (poll.vote_time)
            poll.vote_time = new Date(poll.vote_time);
        return poll;
    }

    private processDatesOnArray(polls: Poll[]): Poll[] {
        return polls.map(poll => {
            if (poll.start_time)
                poll.start_time = new Date(poll.start_time);
            if (poll.finish_time)
                poll.finish_time = new Date(poll.finish_time);
            if (poll.vote_time)
                poll.vote_time = new Date(poll.vote_time);
            return poll;
        });
    }
}
