import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-schulze-results',
    templateUrl: './schulze-results.component.html',
    styleUrls: ['./schulze-results.component.css']
})
export class SchulzeResultsComponent implements OnInit {

    @Input() results;

    state: number = 2;

    constructor() { }

    ngOnInit(): void {
    }

    setState(x: number) {
        this.state = x;
    }

    linkClass(x: number) {
        if (x == this.state)
            return "selected";
        else
            return "";
    }
}
