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

    @Output() selected = new EventEmitter<SelectionEvent>();
    @Output() deselected = new EventEmitter<SelectionEvent>();

    checkControls: FormControl[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.options.forEach(() => this.checkControls.push(this.fb.control(false)))
    }

    divClass(index: number) {
        if (index == 0)
            return "top";
        else if (index == this.options.length - 1)
            return "bottom";
        else
            return "inner";
    }

    toggleCheckbox(index: number): void {
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
