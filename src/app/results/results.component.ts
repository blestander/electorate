import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    @Input() results: any;
    @Input() method: string;
    @Input() options: string[];

    stageIRV: number;

    constructor() { }

    ngOnInit(): void {
        if (this.method == "irv") {
            this.stageIRV = this.results.length - 1;
        }
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

    stageNameIRV(index) {
        if (this.results.length == 1 || index + 1 == this.results.length)
            return "Final";
        else if (index == 0)
            return "Initial";
        else
            return `Stage ${index + 1}`;
    }

    classIRV(index) {
        if (index == this.stageIRV)
            return "irv-stage-selected irv-stage";
        return "irv-stage";
    }
}
