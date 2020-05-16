import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-binary-score-choice',
    templateUrl: './binary-score-choice.component.html',
    styleUrls: ['./binary-score-choice.component.css']
})
export class BinaryScoreChoiceComponent implements OnInit {

    @Input() options: string[];
    @Output() vote = new EventEmitter<string[]>();

    constructor() { }

    ngOnInit(): void {
    }

}
