import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    createForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
    })

    constructor() { }

    ngOnInit(): void {
    }

}
