import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    menuExpanded: boolean = false;

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

    navigateToHistory(): void {
        this.router.navigateByUrl('/history');
    }

    logout(): void {
        this.auth.logout();
    }

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }

    navClass() {
        if (!this.menuExpanded)
            return "collapsed";
        else
            return "";
    }
}
