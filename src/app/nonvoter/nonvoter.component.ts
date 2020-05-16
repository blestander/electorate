import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nonvoter',
    templateUrl: './nonvoter.component.html',
    styleUrls: ['./nonvoter.component.css']
})
export class NonvoterComponent implements OnInit {

    @Input() method: string;
    @Input() options: string[];
    @Input() choice: string | string[];

    constructor() { }

    ngOnInit(): void {
    }

    isChoice(option) {
        if (this.arrayCheck())
            return this.choice.includes(option);
        else
            return this.choice == option;
    }

    classesHTML(selected: boolean): string {
        if (selected)
            return "selected";
        else
            return "";
    }

    arrayCheck() {
        return Array.isArray(this.choice);
    }

    optionList(): string[] {
        if (this.method == 'irv')
            return this.options.filter(x => !this.choice.includes(x));
        else
            return this.options;
    }
}
