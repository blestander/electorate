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
        this.menuExpanded = false;
        this.router.navigateByUrl('/');
    }

    navigateToCreator(): void {
        this.menuExpanded = false;
        this.router.navigateByUrl('/create');
    }

    navigateToHistory(): void {
        this.menuExpanded = false;
        this.router.navigateByUrl('/history');
    }

    logout(): void {
        this.menuExpanded = false;
        this.auth.logout();
    }

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }
    navClass(): string {
        if (!this.menuExpanded)
            return "collapsed";
        else
            return "";
    }

    navToggleClass(): string {
        if (this.menuExpanded)
            return "toggle-expanded";
        else
            return "toggle-collapsed";
    }

    navLastClass(): string {
        if (this.menuExpanded)
            return "last";
        else
            return "collapsed";
    }

}
