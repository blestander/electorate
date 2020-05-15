import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nonvoter',
    templateUrl: './nonvoter.component.html',
    styleUrls: ['./nonvoter.component.css']
})
export class NonvoterComponent implements OnInit {

    @Input() options: string[];
    @Input() choice: string | string[];

    constructor() { }

    ngOnInit(): void {
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
        if (this.arrayCheck())
            return this.options.filter(x => !this.choice.includes(x));
        else
            return this.options;
    }
}
