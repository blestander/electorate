import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-binary-score-choice',
    templateUrl: './binary-score-choice.component.html',
    styleUrls: ['./binary-score-choice.component.css']
})
export class BinaryScoreChoiceComponent implements OnInit {

    @Input() options: string[];
    @Output() vote = new EventEmitter<string[]>();

    selected: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    toggleApproval(option: string) {
        let i = this.selected.indexOf(option);
        if (i >= 0) // Was already selected
            this.selected.splice(i, 1); // Remove from selected
        else // Was not selected
            this.selected.push(option); // Add to selected
    }

}
