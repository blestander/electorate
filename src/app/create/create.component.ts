import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        options: new FormArray([
            new FormControl('', Validators.required)
        ])
    })

    constructor() { }

    ngOnInit(): void {
    }

    get options() {
        return this.createForm.get('options') as FormArray;
    }

    addOption() {
        this.options.push(new FormControl('', Validators.required))
    }

    onSubmit() {
        console.log(this.createForm.value);
    }

}
