import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-owner-options',
    templateUrl: './owner-options.component.html',
    styleUrls: ['./owner-options.component.css']
})
export class OwnerOptionsComponent implements OnInit {

    @Input() finished: boolean;
    @Output() conclude = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    expand: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    finish(): void {
        if (window.confirm("Are you sure you want to end this poll?"))
            this.conclude.emit();
    }

    kill(): void {
        if (window.confirm("Are you sure you want to delete this poll?\nTHIS ACTION IS NOT REVERSIBLE!"))
            this.delete.emit();
    }
}
