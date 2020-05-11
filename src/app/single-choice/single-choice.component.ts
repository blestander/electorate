import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-single-choice',
    templateUrl: './single-choice.component.html',
    styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit {

    @Input() options: string[];
    @Output() vote = new EventEmitter<string>();

    selected: string = null;

    constructor() { }

    ngOnInit(): void {
    }

    handleSelect(option: string) {
        this.selected=option
    }

    castVote(): void {
        this.vote.emit(this.selected);
    }

}
