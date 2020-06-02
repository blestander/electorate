import { Component, OnInit, Input } from '@angular/core';
import { VotingMethod } from '../types';

@Component({
    selector: 'app-voting-method-summary',
    templateUrl: './voting-method-summary.component.html',
    styleUrls: ['./voting-method-summary.component.css']
})
export class VotingMethodSummaryComponent implements OnInit {

    @Input() method: VotingMethod;

    constructor() { }

    ngOnInit(): void {
    }

}
