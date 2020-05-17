import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    loggedIn: boolean = true;
    polls: any[] = [];

    constructor(private pollService: PollService) { }

    ngOnInit(): void {
        this.pollService.getHistory().subscribe({
            next: result => console.log(result),
            error: err => {
                if (err.error == "not_logged_in")
                    this.loggedIn = false;
            }
        })
    }

}
