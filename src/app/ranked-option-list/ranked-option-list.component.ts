import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ranked-option-list',
    templateUrl: './ranked-option-list.component.html',
    styleUrls: ['./ranked-option-list.component.css']
})
export class RankedOptionListComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

}
