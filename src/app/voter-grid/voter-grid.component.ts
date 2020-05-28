import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-voter-grid',
    templateUrl: './voter-grid.component.html',
    styleUrls: ['./voter-grid.component.css']
})
export class VoterGridComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

}
