import { Component, OnInit } from '@angular/core';

import { PollService } from '../poll.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    error: number = null;
    polls: any[];
    sortControl: FormControl = new FormControl('start-desc');
    filterStateControl: FormControl = new FormControl('all');

    constructor(public pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.listPolls().subscribe({
            next: polls => this.polls = polls,
            error: err => this.error = err.status
        });
    }

    onSortChange() {
        switch (this.sortControl.value) {
            case "start-asc":
                this.polls.sort((a, b) => {
                    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
                });
                break;
            case "start-desc":
                this.polls.sort((a, b) => {
                    return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
                });
                break;
            case "name":
                this.polls.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                break;
        }
    }

    get filteredPolls(): any[] {
        switch (this.filterStateControl.value) {
            case 'all':
                return this.polls;
            case 'not-finished':
                return this.polls.filter(x => !x.finished);
            case 'finished':
                return this.polls.filter(x => x.finished);
        }
    }
}
