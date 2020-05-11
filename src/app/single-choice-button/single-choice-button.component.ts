import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-single-choice-button',
    templateUrl: './single-choice-button.component.html',
    styleUrls: ['./single-choice-button.component.css']
})
export class SingleChoiceButtonComponent implements OnInit {

    @Input() option: string;
    @Output() click = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    handleClick() {
        this.click.emit(this.option);
    }

}
