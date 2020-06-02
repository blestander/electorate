import { Component, OnInit } from '@angular/core';
import { VotingMethod } from '../types';

@Component({
    selector: 'app-voting-methods',
    templateUrl: './voting-methods.component.html',
    styleUrls: ['./voting-methods.component.css']
})
export class VotingMethodsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    get fptp(): VotingMethod {
        return {
            name: "Plurality Voting",
            alternateNames: ["First Past the Post"],
            voterSummary: "Voters cast a vote for a single candidate out of all of the available candidates.",
            resolveSummary: "The number of votes received by each candidate is tallied." +
                "The candidate with the most votes wins, regardless of the actual number of votes received.",
            strengths: [
                "Strength 1"
            ],
            weaknesses: [
                "Weakness 1"
            ]
        }
    }

}
