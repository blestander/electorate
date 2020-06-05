import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { webhookRegex } from '../constants';

@Component({
    selector: 'app-owner-options',
    templateUrl: './owner-options.component.html',
    styleUrls: ['./owner-options.component.css']
})
export class OwnerOptionsComponent implements OnInit {

    @Input() finished: boolean;
    @Input() voterRequest: Observable<any[]>;
    @Input() webhook: string;
    @Output() conclude = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
    @Output() setWebhook = new EventEmitter<string>();
    @Output() removeWebhook = new EventEmitter<void>();
    expand: boolean = false;
    showVoters: boolean = false;
    showWebhook: boolean = false;
    voters: any[] = null;
    currentlyReloading: boolean = false;

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
        if (this.voters == null)
            this.voterRequest.subscribe(results => {
                this.voters = results;
            })
    }

    onRemoveWebhook() {
        this.removeWebhook.emit();
    }

    onSetWebhook() {
        let newHook = window.prompt("Enter your new webhook");
        if (webhookRegex.test(newHook)) // Valid webhook
            this.setWebhook.emit(newHook);
        else // Invalid webhook
            window.alert("Invalid webhook syntax. Please double check the link Discord provided you.");
    }

    get reloadButtonClass() {
        if (this.currentlyReloading)
            return "reload-button-active"
        else
            return "reload-button";
    }

    reloadVoters() {
        this.currentlyReloading = true;
        this.voterRequest.subscribe({
            next: results => this.voters = results,
            complete: () => this.currentlyReloading = false
        });
    }
}
