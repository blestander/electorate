import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nonvoter',
    templateUrl: './nonvoter.component.html',
    styleUrls: ['./nonvoter.component.css']
})
export class NonvoterComponent implements OnInit {

    @Input() method: string;
    @Input() options: string[];
    @Input() choice;

    constructor() { }

    ngOnInit(): void {
    }

    isChoice(option) {
        if (this.method == "cav")
            return this.choice[option] == 1;
        else if (this.arrayCheck())
            return this.choice.includes(option);
        else
            return this.choice == option;
    }

    isOpposed(option) {
        if (this.method == "cav")
            return this.choice[option] == -1;
        else
            return false;
    }

    classesHTML(option): string {
        let selected = this.isChoice(option);
        let opposed = this.isOpposed(option);
        if (selected)
            return "selected";
        else if (opposed)
            return "opposed";
        else
            return "";
    }

    arrayCheck() {
        return Array.isArray(this.choice);
    }

    isRankedChoice() {
        return ['irv', 'smithirv', 'mbc', 'schulze'].includes(this.method);
    }

    optionList(): string[] {
        if (this.isRankedChoice())
            return this.options.filter(x => !this.choice.includes(x));
        else
            return this.options;
    }
}
