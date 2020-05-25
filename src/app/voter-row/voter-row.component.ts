import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-voter-row',
    templateUrl: './voter-row.component.html',
    styleUrls: ['./voter-row.component.css']
})
export class VoterRowComponent implements OnInit {

    @Input() voter;

    constructor() { }

    ngOnInit(): void {
        console.log(this.voter);
    }

}
