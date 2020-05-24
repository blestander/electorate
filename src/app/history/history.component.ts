import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    error: number = null;
    polls = [];

    constructor(private pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.getHistory().subscribe({
            next: result => this.setPolls(result),
            error: err => this.error = err.status
        });
    }

    setPolls(polls) {
        this.polls = polls;
    }

}
