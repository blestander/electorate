import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ranked-choice',
    templateUrl: './ranked-choice.component.html',
    styleUrls: ['./ranked-choice.component.css']
})
export class RankedChoiceComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

}
