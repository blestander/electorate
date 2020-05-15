import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ranked-choice',
    templateUrl: './ranked-choice.component.html',
    styleUrls: ['./ranked-choice.component.css']
})
export class RankedChoiceComponent implements OnInit {

    @Input() options: string[];

    choice: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    omittedOptions(): string[] {
        return this.options.filter(x => !this.choice.includes(x));
    }

    appendOption(option) {
        this.choice.push(option);
    }
}
