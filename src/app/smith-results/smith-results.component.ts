import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-smith-results',
    templateUrl: './smith-results.component.html',
    styleUrls: ['./smith-results.component.css']
})
export class SmithResultsComponent implements OnInit {

    @Input() smith;
    @Input() options;

    constructor() { }

    ngOnInit(): void {
    }

}
