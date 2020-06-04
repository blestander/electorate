import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionEvent } from '../types';

@Component({
    selector: 'app-ranked-option',
    templateUrl: './ranked-option.component.html',
    styleUrls: ['./ranked-option.component.css']
})
export class RankedOptionComponent implements OnInit {

    @Input() option: string;
    @Input() index: number;
    @Input() allowEquals: boolean;

    @Input() selectionMode: string;
    @Input() startIndex: number;
    @Input() endIndex: number;

    @Output() selected = new EventEmitter<SelectionEvent>();
    @Output() deselected = new EventEmitter<SelectionEvent>();

    checkControl = new FormControl(false);

    constructor() { }

    ngOnInit(): void {
    }

    toggleCheckbox(): void {
        if (this.checkboxEnabled) {
            this.checkControl.setValue(!this.checkControl.value);
            if (this.checkControl.value)
                this.selected.emit({
                    option: this.option,
                    isArray: false
                });
            else
                this.deselected.emit({
                    option: this.option,
                    isArray: false,
                })
        }
    }

    get isArray(): boolean {
        return false;
    }

    get checkboxEnabled(): boolean {
        if (this.isArray)
            return false; // TODO
        else
            if (this.selectionMode == "unequal")
                return false;
            else if (this.selectionMode == "equal")
                if (this.index + 1 == this.startIndex ||
                        this.index - 1 == this.endIndex ||
                        this.index == this.startIndex ||
                        this.index == this.endIndex)
                    return true;
                else
                    return false;
            else
                return true;
    }

}
