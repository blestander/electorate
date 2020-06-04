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
    @Input() allowEquals: boolean;

    @Output() selected = new EventEmitter<SelectionEvent>();

    checkControl = new FormControl(false);

    constructor() { }

    ngOnInit(): void {
    }

    toggleCheckbox(): void {
        this.checkControl.setValue(!this.checkControl.value);
        if (this.checkControl.value)
            this.selected.emit({
                option: this.option,
                isArray: false
            });
    }

}
