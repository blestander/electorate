import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-irv-results',
    templateUrl: './irv-results.component.html',
    styleUrls: ['./irv-results.component.css']
})
export class IRVResultsComponent implements OnInit {

    @Input() results;
    @Input() choice: string[];

    stage: number;

    constructor() { }

    ngOnInit(): void {
        this.stage = this.results.length - 1;
    }

    stageClass(index) {
        if (index == this.stage)
            return "irv-stage-selected irv-stage";
        return "irv-stage";
    }

    stageName(index): string {
        if (this.results.length == 1 || index + 1 == this.results.length)
            return "Final";
        else if (index == 0)
            return "Initial";
        else
            return `Stage ${index + 1}`;
    }

    get stageNames(): string[] {
        let names: string[] = [];

        for (let i = 0; i < this.results.length; i++)
            names.push(this.stageName(i))

        return names;
    }

    setStage(index) {
        this.stage = index;
    }

    get stageChoice(): string {
        let stageResults = this.results[this.stage];
        let stageChoice = this.choice.filter(x => Object.keys(stageResults).includes(x));
        if (stageChoice.length > 0)
            return stageChoice[0];
        else
            return "";
    }
}
