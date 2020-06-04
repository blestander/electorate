import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ranked-option-list',
    templateUrl: './ranked-option-list.component.html',
    styleUrls: ['./ranked-option-list.component.css']
})
export class RankedOptionListComponent implements OnInit {

    @Input() options: string[];

    constructor() { }

    ngOnInit(): void {
    }

    divClass(index: number) {
        if (index == 0)
            return "top";
        else if (index == this.options.length - 1)
            return "bottom";
        else
            return "inner";
    }

}
