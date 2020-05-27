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

    formatDate(d: string): string {
        return new Date(d).toLocaleString();
    }
}
