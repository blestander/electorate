import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-senary-score-choice',
    templateUrl: './senary-score-choice.component.html',
    styleUrls: ['./senary-score-choice.component.css']
})
export class SenaryScoreChoiceComponent implements OnChanges {

    @Input() options: string[];
    @Output() vote = new EventEmitter();

    results: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnChanges(): void {
        let controlArray = [];
        for (let i = 0; i < this.options.length; i++)
            controlArray.push(this.fb.control('', Validators.required));
        this.results = this.fb.group({
            resultsArray: this.fb.array(controlArray)
        });
    }

    get scores(): number[] {
        return [0, 1, 2, 3, 4, 5];
    }

}
