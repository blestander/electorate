import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SelectionEvent } from '../types';

@Component({
    selector: 'app-ranked-option-list',
    templateUrl: './ranked-option-list.component.html',
    styleUrls: ['./ranked-option-list.component.css']
})
export class RankedOptionListComponent implements OnInit {

    @Input() options: string[];
    @Input() index: number;

    @Input() selectionMode: string;
    @Input() startIndex: number;

    @Output() selected = new EventEmitter<SelectionEvent>();
    @Output() deselected = new EventEmitter<SelectionEvent>();

    checkControls: FormControl[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.options.forEach(() => this.checkControls.push(this.fb.control(false)))
    }

    divClass(index: number) {
        let positional: string;

        if (index == 0)
            positional = "top";
        else if (index == this.options.length - 1)
            positional = "bottom";
        else
            positional = "inner";

        if (this.index == this.startIndex)
            return `selected ${positional}`;
        else
            return positional;
    }

    toggleCheckbox(index: number): void {
        if (this.checkboxesEnabled) {
            let control = this.checkControls[index];
            control.setValue(!control.value);
            if (control.value) {
                this.selected.emit({
                    option: this.options[index],
                    isArray: true
                });
            } else
                this.deselected.emit({
                    option: this.options[index],
                    isArray: true,
                })
        }
    }

    get checkboxesEnabled(): boolean {
        if (this.selectionMode == '')
            return true;
        else if (this.selectionMode == 'equal')
            return false;
        else
            return this.index == this.startIndex;
    }

}
