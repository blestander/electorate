import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-ranked-option',
    templateUrl: './ranked-option.component.html',
    styleUrls: ['./ranked-option.component.css']
})
export class RankedOptionComponent implements OnInit {

    @Input() option: string;
    @Input() allowEquals: boolean;

    checkControl = new FormControl(false);

    constructor() { }

    ngOnInit(): void {
    }

    toggleCheckbox(): void {
        this.checkControl.setValue(!this.checkControl.value);
    }

}
