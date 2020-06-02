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

    // Voting Methods

    get fptp(): VotingMethod {
        return {
            name: "Plurality Voting",
            alternateNames: ["First Past the Post"],
            voterSummary: "Voters cast a vote for a single candidate out of all of the available candidates.",
            resolveSummary: "The number of votes received by each candidate is tallied." +
                "The candidate with the most votes wins, regardless of the actual number of votes received.",
            strengths: [
                {
                    name: "Familiarity",
                    description: "The most common voting method in English speaking countries"
                },
                {
                    name: "Simplicity",
                    description: "The simplest method for voters to understand"
                },
                {
                    name: "Majority Criterion",
                    description: "If a majority of voters strictly prefer one candidate, that candidate will win."
                }
            ],
            weaknesses: [
                {
                    name: "Spoiler Effect",
                    description: "A less popular candidate with similar beliefs to a candidate who might " +
                        "otherwise win can cause that otherwise winning candidate to lose to someone " +
                        "that the majority greatly dislikes."
                },
                {
                    name: "Clone Negative",
                    description: "The addition of a candidate that is exceedingly similar to an existing candidate will " +
                        "reduce that chances that that existing candidate will win."
                },
                {
                    name: "Fails Condorcet Criterion",
                    description: "If there is a candidate that could defeat every other candidate in a head-to-head " +
                        "election, that candidate (the Condorcet winner) is not guaranteed to win."
                },
                {
                    name: "Fails Condorcet Loser Criterion",
                    description: "If there is a candidate that would lose to every other candidate in a head-to-head " +
                        "election, that candidate (the Condorcet loser) is not guaranteed to lose."
                },
                {
                    name: "Favors Two Parties",
                    description: "Over many elections, plurality voting trends towards reducing the number of parties " +
                        "that can possibly win to two."
                }
            ]
        }
    }

}
