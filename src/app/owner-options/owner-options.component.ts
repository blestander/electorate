import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-owner-options',
    templateUrl: './owner-options.component.html',
    styleUrls: ['./owner-options.component.css']
})
export class OwnerOptionsComponent implements OnInit {

    @Output() conclude = new EventEmitter<void>();
    expand: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    displayCSS(): string {
        return this.expand ? "flex" : "none";
    }

    finish(): void {
        if (window.confirm("Are you sure you want to end this poll?"))
            this.conclude.emit();
    }

    kill(): void {
        window.confirm("Are you sure you want to delete this poll?\nTHIS ACTION IS NOT REVERSIBLE!")
        // TODO
    }
}
