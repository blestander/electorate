import { Component, OnInit, Input } from '@angular/core';
import { VotingMethod, VotingMethodAttribute } from '../types';

@Component({
    selector: 'app-voting-method-summary',
    templateUrl: './voting-method-summary.component.html',
    styleUrls: ['./voting-method-summary.component.css']
})
export class VotingMethodSummaryComponent implements OnInit {

    @Input() method: VotingMethod;

    showImplNotes: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    get name(): string {
        return this.method.name;
    }

    get alternateNames(): string {
        if (this.method.alternateNames)
            return this.method.alternateNames.join(", ");
        else
            return undefined;
    }

    get voterSummary(): string {
        return this.method.voterSummary;
    }

    get resolveSummary(): string {
        return this.method.resolveSummary;
    }

    get strengths(): VotingMethodAttribute[] {
        return this.method.strengths;
    }

    get weaknesses(): VotingMethodAttribute[] {
        return this.method.weaknesses;
    }

    get implNotes(): string[] {
        return this.method.implNotes;
    }

    get wikipediaLink(): string {
        return this.method.wikipedia;
    }

    get warning(): string {
        return this.method.warning;
    }

    toggleImplNotes(): void {
        this.showImplNotes = !this.showImplNotes;
    }

}
