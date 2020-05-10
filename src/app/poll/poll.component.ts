import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PollService } from '../poll.service';

@Component({
    selector: 'app-poll',
    templateUrl: './poll.component.html',
    styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

    id: string;
    poll = null;
    error = false;

    constructor(
        private route: ActivatedRoute,
        private pollService: PollService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = this.id = params.get("id")
            this.pollService.getPoll(id).subscribe({
                next: poll => this.poll = poll,
                error: err => this.error = true
            });
        })
    }

}
