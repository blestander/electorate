import { Component, OnInit } from '@angular/core';

import { PollService } from '../poll.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    loggedIn: boolean = true;
    polls: any[] = [];

    constructor(public pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.listPolls().subscribe({
            next: polls => this.polls = polls,
            error: err => {
                if (err.error == "not_logged_in")
                    this.loggedIn = false;
                else
                    console.log(err.error);
            }
        });
    }

}
