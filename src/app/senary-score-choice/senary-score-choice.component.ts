import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-senary-score-choice',
    templateUrl: './senary-score-choice.component.html',
    styleUrls: ['./senary-score-choice.component.css']
})
export class SenaryScoreChoiceComponent implements OnInit {

    @Input() options: string[];
    @Output() vote = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
