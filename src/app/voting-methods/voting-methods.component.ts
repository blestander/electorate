import { Component, OnInit } from '@angular/core';
import { VotingMethod, VotingMethodAttribute } from '../types';

@Component({
    selector: 'app-voting-methods',
    templateUrl: './voting-methods.component.html',
    styleUrls: ['./voting-methods.component.css']
})
export class VotingMethodsComponent implements OnInit {

    currentMethod: VotingMethod;

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
                this.passesMajorityCriterion,
                this.passesParticipation,
            ],
            weaknesses: [
                {
                    name: "Spoiler Effect",
                    description: "A less popular candidate with similar beliefs to a candidate who might " +
                        "otherwise win can cause that otherwise winning candidate to lose to someone " +
                        "that the majority greatly dislikes."
                },
                this.cloneNegative,
                this.failsMutualMajorityCriterion,
                this.failsCondorcetCriterion,
                this.failsCondorcetLoserCriterion,
                {
                    name: "Allows Wins With Low Support",
                    description: "If there are a large number of candidates, Plurality Voting may often elect a candidate " +
                        "who may only have 20% or 30% of the vote, if they manage to have higher support than everyone else."
                },
                {
                    name: "Favors Two Parties",
                    description: "Over many elections, plurality voting trends towards reducing the number of parties " +
                        "that can possibly win to two."
                }
            ],
            wikipedia: "https://en.wikipedia.org/wiki/First-past-the-post_voting"
        }
    }

    get irv(): VotingMethod {
        return {
            name: "Instant Runoff Voting",
            alternateNames: [
                "(Single) Alternative Voting",
                "Preferential Voting",
                "Ranked Choice Voting",
            ],
            voterSummary: "Voters rank all (or some) of the candidates from most to least liked, with no ties. " +
                "Omitted options are treated as equally disliked.",
            resolveSummary: "Votes are initially considered to have gone to the voter's first preference. " +
                "If one candidate has a majority of  votes, they win. " +
                "If no candidates have a majority, the candidate(s) with the least number of votes is eliminated, " +
                "and their votes go to their next choice, or will be discarded if they have not ranked any more " +
                "candidates. " +
                "This process is repeated until one candidate has a majority of votes.",
            strengths: [
                this.passesCondorcetLoserCriterion,
                this.passesIndependenceOfClones,
                this.passesMajorityCriterion,
                this.passesMutualMajorityCriterion,
                this.passesLaterNoHarm,
                this.passesMonotonicity,
            ],
            weaknesses: [
                this.failsCondorcetCriterion,
                this.failsParticipation,
            ],
            implNotes: [
                "Some implementations may mandate that all voters rank all candidates for their ballots to be considered " +
                    "valid. Electorate does not offer this even as an option."
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Instant-runoff_voting"
        };
    }

    get mbc(): VotingMethod {
        return {
            name: "Modified Borda Count",
            voterSummary: "Voters rank some or all of the candidates from most to least liked, with no ties.",
            resolveSummary: "For each ballot, the top ranked candidate received N points, where N is the number of " +
                "candidates ranked on this ballot, the second ranked candidate receives N-1, and so on. Unranked " +
                "candidates all receive 0 points. The points received from each ballot are then summed up, and " +
                "the candidate with the most points wins.",
            strengths: [
                {
                    name: "Favors consensus",
                    description: "This method may select a candidate who is liked by a large majority over a candidate " +
                        "who is prefered by a slim majority."
                },
                this.passesParticipation,
                this.passesCondorcetLoserCriterion,
                this.passesMonotonicity,
            ],
            weaknesses: [
                this.failsMajorityCriterion,
                this.failsCondorcetCriterion,
                this.clonePositive,
                this.failsLaterNoHarm,
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Borda_count#Modified_Borda_count"
        }
    }

    get score(): VotingMethod {
        return {
            name: "Score Voting / Combined Approval Voting",
            alternateNames: [
                "Range Voting",
                "Evaluative Voting",
                "Utility Voting"
            ],
            voterSummary: "Voters must give each candidate a score, based on how much they like them.",
            resolveSummary: "The candidate with the highest average score wins.",
            strengths: [
                this.passesParticipation,
                this.passesIndependenceOfClones,
                this.passesMonotonicity,
            ],
            weaknesses: [
                this.failsMajorityCriterion,
                this.failsCondorcetCriterion,
                this.failsCondorcetLoserCriterion,
                this.failsLaterNoHarm,
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Score_voting",
            implNotes: [
                "Score voting can theoretically handle any number of ranges, with any number of continuous or discrete " +
                    "choices in those ranges. However, most implementations will not allow for every concievable " +
                    "configuration, and Electorate is no different. " +
                    "Electorate provides two options: selecting Score Voting as your voting method will allow voters " +
                    "to give an integer score from 0 to 5, and selecting Combined Approval Voting will allow voters " +
                    "to designated that they support, oppose, or are neutral towards a candidate, translating to scores " +
                    "of 1, -1, and 0, respectively."
            ]
        }
    }

    get schulze(): VotingMethod {
        return {
            name: "Schulze Method",
            alternateNames: ["Beatpath Method", "Path Voting"],
            voterSummary: "Voters rank some or all candidates from most to least liked.",
            resolveSummary: "Please check the Wikipedia link below. The Schulze Method is not a simple method to " +
                "explain or follow.",
            strengths: [
                this.passesMajorityCriterion,
                this.passesMutualMajorityCriterion,
                this.passesCondorcetCriterion,
                this.passesCondorcetLoserCriterion,
                this.passesIndependenceOfClones,
                this.passesMonotonicity,
            ],
            weaknesses: [
                this.failsLaterNoHarm,
                this.failsParticipation,
            ],
            implNotes: [
                "The Schulze Method allows for ranking multiple candidates as equal. However, at present, " +
                    "Electorate does not."
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Schulze_method"
        }
    }

    get approval(): VotingMethod {
        return {
            name: "Approval Voting",
            voterSummary: "Voters designate whether or not they approve of/find acceptable each candidate.",
            resolveSummary: "Each candidate receives a score equal to the number of voters that approved of them. " +
                "The candidate with the most votes in support wins.",
            strengths: [
                this.passesMajorityCriterion,
                this.passesMutualMajorityCriterion,
                this.passesCondorcetCriterion,
                this.passesCondorcetLoserCriterion,
                this.passesMonotonicity,
                this.passesParticipation,
                this.passesIndependenceOfClones,
            ],
            weaknesses: [
                {
                    name: "Requires Dichotomous Preferences",
                    description: "The above strengths will not hold if voters do not have dichotomous preferences."
                }
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Approval_voting",
            warning: "The strengths and weaknesses listed below assume that voters will have dichotomous preferences " +
                "(they either like a candidate or not). If voters may prefer some candidates over others and may want " +
                "to express that in their vote, the strengths and weaknesses listed below may not hold, and this method " +
                "likely will not produce the results you were hoping for."
        }
    }

    get smithirv(): VotingMethod {
        return {
            name: "Smith/Instant Runoff Voting",
            voterSummary: "Voters rank all (or some) of the candidates from most to least liked, with no ties. " +
                "Omitted options are treated as equally disliked.",
            resolveSummary: "The smallest set of candidates that could defeat all candidates outside the set in a " +
                "head-to-head election is found. The procedure for instant runoff voting is then followed on that set.",
            strengths: [
                this.passesMajorityCriterion,
                this.passesMutualMajorityCriterion,
                this.passesCondorcetCriterion,
                this.passesCondorcetLoserCriterion,
                this.passesIndependenceOfClones,
                this.passesMonotonicity,
            ],
            weaknesses: [
                this.failsLaterNoHarm,
                this.failsParticipation,
            ],
            wikipedia: "https://en.wikipedia.org/wiki/Condorcet_method#Two-method_systems"
        }
    }

    // Criteria

    get passesMajorityCriterion(): VotingMethodAttribute {
        return {
            name: "Satisfies Majority Criterion",
            description: "If a majority of voters strictly prefer one candidate, that candidate will win."
        }
    }

    get failsMajorityCriterion(): VotingMethodAttribute {
        return {
            name: "Fails Majority Criterion",
            description: "If a majority of voters strictly prefer one candidate, that candidate is not guaranteed to win."
        }
    }

    get passesMutualMajorityCriterion(): VotingMethodAttribute {
        return {
            name: "Satisfies Mutual Majority Criterion",
            description: "If a majority of voters prefer every member of a group of candidates to every candidate " +
                "outside that group, then a member of the prefered group must win."
        }
    }

    get failsMutualMajorityCriterion(): VotingMethodAttribute {
        return {
            name: "Fails Mutual Majority Criterion",
            description: "Even if a majority of voters prefer every member of a group of candidates to every candidate " +
                "outside that group, it is not guaranteed that a member of the prefered group will win."
        }
    }

    get passesCondorcetCriterion(): VotingMethodAttribute {
        return {
            name: "Satisfies Condorcet Criterion",
            description: "If there is a candidate that could defeat every other candidate in a head-to-head " +
                "election, that candidate (the Condorcet winner) is guaranteed to win."
        }
    }

    get failsCondorcetCriterion(): VotingMethodAttribute {
        return {
            name: "Fails Condorcet Criterion",
            description: "If there is a candidate that could defeat every other candidate in a head-to-head " +
                "election, that candidate (the Condorcet winner) is not guaranteed to win."
        }
    }

    get passesCondorcetLoserCriterion(): VotingMethodAttribute {
        return {
            name: "Satisfies Condorcet Loser Criterion",
            description: "If there is a candidate that would lose to every other candidate in a head-to-head " +
                "election, that candidate (the Condorcet loser) is guaranteed to lose."
        }
    }

    get failsCondorcetLoserCriterion(): VotingMethodAttribute {
        return {
            name: "Fails Condorcet Loser Criterion",
            description: "If there is a candidate that would lose to every other candidate in a head-to-head " +
                "election, that candidate (the Condorcet loser) is not guaranteed to lose."
        }
    }

    get passesIndependenceOfClones(): VotingMethodAttribute {
        return {
            name: "Independence of Clones",
            description: "The addition of a losing candidate that is exceedingly similar to an existing candidate " +
                "will have no effect on that existing candidate's chances of winning."
        }
    }

    get cloneNegative(): VotingMethodAttribute {
        return {
            name: "Clone Negative",
            description: "The addition of a losing candidate that is exceedingly similar to an existing candidate " +
                "will reduce that chances that that existing candidate will win."
        }
    }

    get clonePositive(): VotingMethodAttribute {
        return {
            name: "Clone Positive",
            description: "The addition of a losing candidate that is exceedingly similar to an existing candidate " +
            "will increase that chances that that existing candidate will win."
        }
    }

    get passesLaterNoHarm(): VotingMethodAttribute {
        return {
            name: "Passes Later-No-Harm Criterion",
            description: "If a voter alters the order of candidates lower in his/her preference, or ranks a less " +
                "prefered candidate on their ballot, then this does not affect the chances of the most prefered " +
                "candidate being elected."
        }
    }

    get failsLaterNoHarm(): VotingMethodAttribute {
        return {
            name: "Fails Later-No-Harm Criterion",
            description: "If a voter alters the order of candidates lower in his/her preference, or ranks a less " +
                "prefered candidate on their ballot, then this may affect the chances of the most prefered " +
                "candidate being elected."
        }
    }

    get passesParticipation(): VotingMethodAttribute {
        return {
            name: "Passes Participation Criterion",
            description: "A voter cannot improve the chances of their preferred candidate by not voting."
        }
    }

    get failsParticipation(): VotingMethodAttribute {
        return {
            name: "Fails Participation Criterion",
            description: "A voter can, in some cases, improve the chances of their preferred by not voting."
        }
    }

    get passesMonotonicity(): VotingMethodAttribute {
        return {
            name: "Monotone",
            description: "It is impossible to help a candidate by ranking them lower, " +
                "and it is impossible to harm a candidate by ranking them higher."
        }
    }

    get failsMonotonicity(): VotingMethodAttribute {
        return {
            name: "Not Monotone",
            description: "It may be possible to harm a candidate by ranking them higher " +
                "or help a candidate by ranking them lower."
        }
    }

    linkClass(method): string {
        if (this.currentMethod && method.name == this.currentMethod.name)
            return "selected";
        else
            return "";
    }

}
