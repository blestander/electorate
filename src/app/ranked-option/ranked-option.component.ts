import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ranked-option',
    templateUrl: './ranked-option.component.html',
    styleUrls: ['./ranked-option.component.css']
})
export class RankedOptionComponent implements OnInit {

    @Input() option: string;

    constructor() { }

    ngOnInit(): void {
    }

}
