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
    @Input() selected: number | string;

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

    justifyContentCSS(): string {
        return this.centered ? "center" : "flex-start";
    }

    linkClass(index: number): string {
        if (this.internalNames)
            if (this.internalNames[index] == this.selected)
                return "selected";
            else
                return "";
        else
            if (index == this.selected)
                return "selected";
            else
                return "";
    }
}
