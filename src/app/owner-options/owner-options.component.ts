import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-owner-options',
    templateUrl: './owner-options.component.html',
    styleUrls: ['./owner-options.component.css']
})
export class OwnerOptionsComponent implements OnInit {

    expand: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    displayCSS(): string {
        return this.expand ? "flex" : "none";
    }
}
