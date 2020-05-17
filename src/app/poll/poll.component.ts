import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PollService } from '../poll.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

    id: string;
    poll = null;
    error: string = null;
    loggedIn: boolean = true;

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
                error: err => {
                    if (err.error == "not_logged_in")
                        this.loggedIn = false;
                    else
                        this.error = `${err.status}`;
                }
            });
        });
    }

    vote(choice) {
        this.pollService.castVote(this.id, choice)
            .subscribe(o => {
                let p = this.poll;
                this.poll = {...p, ...o};
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

}
