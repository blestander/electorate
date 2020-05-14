import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    @Input() results: Object;
    @Input() method: string;
    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

    sortedFPTPResults() {
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
}
