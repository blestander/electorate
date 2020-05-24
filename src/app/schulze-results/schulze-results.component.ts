import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-schulze-results',
    templateUrl: './schulze-results.component.html',
    styleUrls: ['./schulze-results.component.css']
})
export class SchulzeResultsComponent implements OnInit {

    @Input() results;

    constructor() { }

    ngOnInit(): void {
    }

}
