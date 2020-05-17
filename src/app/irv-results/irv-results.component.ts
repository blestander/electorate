import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-irv-results',
    templateUrl: './irv-results.component.html',
    styleUrls: ['./irv-results.component.css']
})
export class IRVResultsComponent implements OnInit {

    @Input() results;

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

    stageName(index) {
        if (this.results.length == 1 || index + 1 == this.results.length)
            return "Final";
        else if (index == 0)
            return "Initial";
        else
            return `Stage ${index + 1}`;
    }

    setStage(index) {
        this.stage = index;
    }
}
