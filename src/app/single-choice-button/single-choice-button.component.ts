import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-single-choice-button',
    templateUrl: './single-choice-button.component.html',
    styleUrls: ['./single-choice-button.component.css']
})
export class SingleChoiceButtonComponent implements OnInit {

    @Input() option: string;

    constructor() { }

    ngOnInit(): void {
    }

}
