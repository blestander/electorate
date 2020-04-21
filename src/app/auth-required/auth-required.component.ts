import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-auth-required',
    templateUrl: './auth-required.component.html',
    styleUrls: ['./auth-required.component.css']
})
export class AuthRequiredComponent implements OnInit {

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

}
