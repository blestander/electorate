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
        else if (this.isScoreVoting())
            return this.choice;
        else if (this.arrayCheck())
            return this.deepIncludes(option);
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

    isArray(a) {
        return Array.isArray(a);
    }

    isRankedChoice() {
        return ['irv', 'smithirv', 'mbc', 'schulze'].includes(this.method);
    }

    isScoreVoting() {
        return this.method.startsWith('score');
    }

    optionList(): string[] {
        if (this.isRankedChoice())
            return this.options.filter(x => !this.deepIncludes(x));
        else
            return this.options;
    }

    deepIncludes(x: string) {
        for (let i = 0; i < this.choice.length; i++) {
            if (Array.isArray(this.choice[i])) {
                if (this.choice[i].includes(x))
                    return true;
            } else
                if (this.choice[i] == x)
                    return true;
        }
        return false;
    }
}
