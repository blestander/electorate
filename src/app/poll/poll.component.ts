import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PollService } from '../poll.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

    id: string;
    poll = null;
    error: number = null;
    voters: Observable<any[]> = null;

    constructor(
        private route: ActivatedRoute,
        private pollService: PollService,
        public auth: AuthService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = this.id = params.get("id")
            this.pollService.getPoll(id).subscribe({
                next: poll => this.poll = poll,
                error: err => this.error = err.status
            });
            this.requestVoters();
        });
    }

    vote(choice) {
        this.pollService.castVote(this.id, choice, this.poll.guild_proof)
            .subscribe({
                next: o => {
                    let p = this.poll;
                    this.poll = {...p, ...o};
                },
                error: err => {
                    if (err.status == 0)
                        window.alert('Unable to reach server to submit vote');
                    else if (err.status == 400)
                        window.alert('Server has rejected vote');
                    else if (err.status == 401)
                        window.alert('Authentication error');
                    else if (err.status == 403)
                        window.alert('Authorization error');
                    else if (err.status == 500)
                        window.alert('Server error. Please try again later');
                    else
                        window.alert(`Unknown error: Code ${err.status}`);
                }
            });
    }

    finishPoll(): void {
        console.log("Finishing poll!");
        this.pollService.finishPoll(this.id)
            .subscribe({
                next: o => {
                    let p = this.poll;
                    this.poll = {...p, ...o};
                    console.log("Poll finished!");
                },
                error: err => {
                    switch (err.error) {
                        case "no_votes":
                            window.alert("Cannot conclude a poll with no votes.");
                            break;
                    }
                }
            })
    }

    deletePoll(): void {
        console.log("Deleting poll!");
        this.pollService.deletePoll(this.id);
    }

    requestVoters(): void {
        this.voters = this.pollService.getVoters(this.id);
    }

    onSetWebhook(newHook: string): void {
        this.pollService.setWebhook(this.id, newHook).subscribe({
            next: o => this.poll = {...this.poll, ...o},
            error: err => {
                if (err.status == 0)
                    window.alert("Unable to reach server");
                else if (err.status == 409) {
                    window.alert("Page state is out of date. This page will reload when you click okay.");
                    location.reload();
                } else if (err.status == 500)
                    window.alert("Server error");
                else
                    window.alert(`Unknown error: ${err.status}`);
            }
        })
    }

    onRemoveWebhook(): void {
        this.pollService.removeWebhook(this.id).subscribe({
            next: o => this.poll = {...this.poll, ...o},
            error: err => {
                if (err.status == 0)
                    window.alert("Unable to reach server");
                else if (err.status == 409) {
                    window.alert("Page state is out of date. This page will reload when you click okay.");
                    location.reload();
                } else if (err.status == 500)
                    window.alert("Server error");
                else
                    window.alert(`Unknown error: ${err.status}`);
            }
        });
    }

}
