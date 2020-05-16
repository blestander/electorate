import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
    }

    navigateToDashboard(): void {
        this.router.navigateByUrl('/');
    }

    navigateToCreator(): void {
        this.router.navigateByUrl('/create');
    }

    logout(): void {
        this.auth.logout();
    }
}
