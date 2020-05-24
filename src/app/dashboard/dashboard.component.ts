import { Component, OnInit } from '@angular/core';

import { PollService } from '../poll.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    error: number = null;
    polls: any[];

    constructor(public pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.listPolls().subscribe({
            next: polls => this.polls = polls,
            error: err => this.error = err.status
        });
    }

}
