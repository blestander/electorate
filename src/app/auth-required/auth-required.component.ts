import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-auth-required',
    templateUrl: './auth-required.component.html',
    styleUrls: ['./auth-required.component.css']
})
export class AuthRequiredComponent implements OnInit {

    rememberControl: FormControl = new FormControl(false);

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    authorize() {
        this.authService.authorize(this.rememberControl.value);
    }

}
