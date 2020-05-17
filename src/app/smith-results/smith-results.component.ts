import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-smith-results',
    templateUrl: './smith-results.component.html',
    styleUrls: ['./smith-results.component.css']
})
export class SmithResultsComponent implements OnInit {

    @Input() smith;
    @Input() options;

    constructor() { }

    ngOnInit(): void {
    }

    resultClass(option, secondOption): string {
        if (option == secondOption)
            return "same";
        else if (this.smith.table[option][secondOption] > 0.5)
            return "win";
        else if (this.smith.table[option][secondOption] == 0.5)
            return "tie";
        else
            return "loss";
    }

}
