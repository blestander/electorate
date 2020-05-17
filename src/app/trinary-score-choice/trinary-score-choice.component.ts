import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-trinary-score-choice',
    templateUrl: './trinary-score-choice.component.html',
    styleUrls: ['./trinary-score-choice.component.css']
})
export class TrinaryScoreChoiceComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

}
