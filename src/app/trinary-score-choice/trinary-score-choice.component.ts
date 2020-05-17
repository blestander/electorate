import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-trinary-score-choice',
    templateUrl: './trinary-score-choice.component.html',
    styleUrls: ['./trinary-score-choice.component.css']
})
export class TrinaryScoreChoiceComponent implements OnInit {

    @Input() options: string[];

    choice = {};

    constructor() { }

    ngOnInit(): void {
        this.options.forEach(option => this.choice[option] = 0);
    }

    setChoice(option, value) {
        this.choice[option] = value;
    }

    castVote() {
        console.log(this.choice);
    }

}
