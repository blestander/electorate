import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    loggedIn: boolean = true;
    polls = [];

    constructor(private pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.getHistory().subscribe({
            next: result => this.setPolls(result),
            error: err => {
                if (err.error == "not_logged_in")
                    this.loggedIn = false;
            }
        })
    }

    setPolls(polls) {
        this.polls = polls;
    }

}
