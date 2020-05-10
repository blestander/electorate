import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-single-choice',
    templateUrl: './single-choice.component.html',
    styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

}
