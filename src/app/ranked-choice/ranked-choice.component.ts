import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SelectionEvent } from '../types';

@Component({
    selector: 'app-ranked-choice',
    templateUrl: './ranked-choice.component.html',
    styleUrls: ['./ranked-choice.component.css']
})
export class RankedChoiceComponent implements OnInit {

    @Input() options: string[];
    @Input() allowEquals: boolean
    @Output() vote = new EventEmitter<(string | string[])[]>();

    choice: (string | string[])[] = [];

    selectionMode: string = "";
    selected: string[] = [];
    startIndex: number = null;
    endIndex: number = null;

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
            if (event.previousIndex > event.currentIndex) { // Slide up
                for (let i = event.previousIndex - 1; i >= event.currentIndex; i--)
                    this.choice[i + 1] = this.choice[i];
                if (event.previousIndex > this.endIndex && event.currentIndex <= this.startIndex) {
                    this.startIndex += 1;
                    this.endIndex += 1;
                    console.log(`${this.startIndex}-${this.endIndex}: ${this.selected.join(', ')}`);
                }
            }
            else { // Slide down
                for (let i = event.previousIndex + 1; i <= event.currentIndex; i++)
                    this.choice[i - 1] = this.choice[i];
                if (event.currentIndex >= this.endIndex && event.previousIndex < this.startIndex) {
                    this.startIndex -= 1;
                    this.endIndex -= 1;
                    console.log(`${this.startIndex}-${this.endIndex}: ${this.selected.join(', ')}`);
                }
            }
            this.choice[event.currentIndex] = swap;
        } else { // Newly ranked item
            this.choice.splice(event.currentIndex, 0, this.omittedOptions[event.previousIndex]);
        }
    }

    onOmittedDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer != event.container) { // Deranked item
            this.choice.splice(event.previousIndex, 1);
            if (this.selectionMode != '' && event.previousIndex < this.startIndex) {
                this.startIndex -= 1;
                this.endIndex -= 1;
                console.log(`${this.startIndex}-${this.endIndex}: ${this.selected.join(', ')}`);
            }
        } // Couldn't care less otherwise
    }

    onSelection(event: SelectionEvent, index: number) {
        if (event.isArray) {
            // TODO
        } else {
            if (!this.selectionMode) {
                this.selectionMode = "equal";
                this.startIndex = index;
                this.endIndex = index;
            } else if (index < this.startIndex)
                this.startIndex = index;
            else
                this.endIndex = index;
            this.selected.push(event.option);
            console.log(`${this.startIndex}-${this.endIndex}: ${this.selected.join(', ')}`);
        }
    }

    onDeselection(event: SelectionEvent, index: number) {
        if (event.isArray) {
            // TODO
        } else {
            if (this.startIndex == this.endIndex) {
                this.selectionMode = "";
                this.startIndex = null;
                this.endIndex = null;
            } else if (index == this.startIndex)
                this.startIndex += 1;
            else
                this.endIndex -= 1;
            let selectedIndex = this.selected.indexOf(event.option);
            this.selected.splice(selectedIndex, 1);
            console.log(`${this.startIndex}-${this.endIndex}: ${this.selected.join(', ')}`);
        }
    }
}
