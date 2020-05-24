import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-schulze-results',
    templateUrl: './schulze-results.component.html',
    styleUrls: ['./schulze-results.component.css']
})
export class SchulzeResultsComponent implements OnInit {

    @Input() options;
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

    cellContent(option, option2) {
        switch (this.state) {
            case 0:
                return this.results.raw[option][option2];
            case 1:
                return this.results.paths[option][option2];
        }
    }

    cellClass(option, option2) {
        if (option == option2)
            return "same"
        else {
            let difference;
            if (this.state == 0)
                difference = this.results.raw[option][option2] - this.results.raw[option2][option];
            else if (this.state == 1)
                difference = this.results.paths[option][option2] - this.results.paths[option2][option];

            if (difference > 0)
                return "win";
            else if (difference < 0)
                return "loss";
            else
                return "tie";
        }
    }
}
