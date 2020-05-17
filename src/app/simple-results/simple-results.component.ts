import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-simple-results',
    templateUrl: './simple-results.component.html',
    styleUrls: ['./simple-results.component.css']
})
export class SimpleResultsComponent implements OnInit {

    @Input() options;
    @Input() results;

    constructor() { }

    ngOnInit(): void {
    }

    sortedResults(): string[] {
        let sortedOptions = this.options.slice().sort((a, b) => {
            return this.results[b] - this.results[a];
        });

        let groupedOptions = new Array();
        let previous = Number.MAX_SAFE_INTEGER;
        sortedOptions.forEach((value, index) => {
            if (this.results[value] == previous)
                groupedOptions[groupedOptions.length - 1].push(value);
            else {
                previous = this.results[value];
                groupedOptions.push([value]);
            }
        });
        return groupedOptions;
    }

    votes(option) {
        return this.results[option];
    }

}
