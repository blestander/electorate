import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-owner-options',
    templateUrl: './owner-options.component.html',
    styleUrls: ['./owner-options.component.css']
})
export class OwnerOptionsComponent implements OnInit {

    @Input() finished: boolean;
    @Input() voters: Observable<any[]>;
    @Output() conclude = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Output() needVoters = new EventEmitter<void>();
    expand: boolean = false;
    showVoters: boolean = false;

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

    toggleVoters(): void {
        this.showVoters = !this.showVoters;
        if (this.showVoters && !this.voters)
            this.needVoters.emit();
    }
}
