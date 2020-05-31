import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-ranked-choice',
    templateUrl: './ranked-choice.component.html',
    styleUrls: ['./ranked-choice.component.css']
})
export class RankedChoiceComponent implements OnInit {

    @Input() options: string[];
    @Output() vote = new EventEmitter<string[]>();

    choice: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    get omittedOptions(): string[] {
        return this.options.filter(x => !this.choice.includes(x));
    }

    appendOption(option) {
        this.choice.push(option);
    }

    raiseOption(index) {
        let swap = this.choice[index];
        this.choice[index] = this.choice[index - 1];
        this.choice[index - 1] = swap;
    }

    lowerOption(index) {
        this.raiseOption(index + 1);
    }

    unrankOption(index) {
        this.choice.splice(index, 1);
    }

    onVote() {
        this.vote.emit(this.choice);
    }

    onRankedDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer == event.container) { // Reordering items
            let swap = this.choice[event.previousIndex];
            this.choice[event.previousIndex] = this.choice[event.currentIndex];
            this.choice[event.currentIndex] = swap;
        } else { // Newly ranked item
            this.choice.splice(event.currentIndex, 0, this.omittedOptions[event.previousIndex]);
        }
    }

    onOmittedDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer != event.container) { // Deranked item
            this.choice.splice(event.previousIndex, 1);
        } // Couldn't care less otherwise

    }
}
