import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-state-change',
    templateUrl: './state-change.component.html',
    styleUrls: ['./state-change.component.css']
})
export class StateChangeComponent implements OnInit {

    @Input() labels: string[];
    @Input() internalNames: string[];
    @Input() centered: boolean = false;

    @Output() changedState = new EventEmitter<string | number>();

    constructor() { }

    ngOnInit(): void {
    }

    onClick(index: number): void {
        if (this.internalNames)
            this.changedState.emit(this.internalNames[index]);
        else
            this.changedState.emit(index);
    }

    justifyContentCSS() {
        return this.centered ? "center" : "flex-start";
    }
}
