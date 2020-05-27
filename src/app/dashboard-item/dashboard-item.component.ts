import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-item',
    templateUrl: './dashboard-item.component.html',
    styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

    @Input() poll: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    goto(id: string) {
        this.router.navigateByUrl(`/poll/${id}`);
    }

    get timeString(): string {
        if (this.poll.start_time) {
            let start = new Date(this.poll.start_time).toLocaleString();
            if (this.poll.finish_time) {
                let finish = new Date(this.poll.finish_time).toLocaleString();
                return `Ran ${start} to ${finish}`;
            } else
                return `Created ${start}`;
        } else if (this.poll.vote_time) {
            let voted = new Date(this.poll.vote_time).toLocaleString();
            return `Voted ${voted}`;
        } else
            return 'Time data missing'
    }
}
