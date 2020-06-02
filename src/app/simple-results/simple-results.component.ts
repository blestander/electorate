import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-simple-results',
    templateUrl: './simple-results.component.html',
    styleUrls: ['./simple-results.component.css']
})
export class SimpleResultsComponent implements OnInit {

    @Input() results;
    @Input() scores: boolean = false;
    @Input() cav: boolean = false;
    @Input() showValues: boolean = true;
    @Input() choice: any;

    constructor() { }

    ngOnInit(): void {
    }

    sortedResults(): string[] {
        let sortedOptions = Object.keys(this.results).sort((a, b) => {
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

    liClass(option) {
        if (this.cav) {
            if (this.choice[option] == 1)
                return "choice";
            else if (this.choice[option] == -1)
                return "antichoice";
            else
                return "";
        } else
            if (Array.isArray(this.choice))
                if (this.choice.includes(option))
                    return "choice";
                else
                    return "";
            else
                if (this.choice == option)
                    return "choice";
                else
                    return "";
    }

}
