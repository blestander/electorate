import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DISCORD_SCOPE, DISCORD_CLIENT_ID } from './constants';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    beforeEach(() => {
        // Create router spy
        router = jasmine.createSpyObj(
            'Router',
            ['navigateByUrl'],
            { url: '/somewhere' }
        );

        // Configure test bed
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: Router, useValue: router }
            ]
        });

        // Get objects we need to test
        service = TestBed.inject(AuthService);

        // Clear out sessionStorage
        sessionStorage.clear();

        // Spy on internal methods
        spyOn<any>(service, 'externalRedirect');
        spyOn<any>(service, 'reload');
        spyOn<any>(service, 'origin').and.returnValue('origin');
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it("#authorize functions when remember=false", () => {
        // Call function
        service.authorize(false);

        // Expect session storage to have an entry
        expect(sessionStorage.length).toBe(1);

        // Determine state variable
        const state: string = sessionStorage.key(0);

        // Expect value at state variable to be correct
        const value: string = sessionStorage.getItem(state);
        expect(value).toBeDefined();
        try {
            const { redirect, remember } = JSON.parse(value);
            expect(redirect).toBe("/somewhere");
            expect(remember).toBeFalse();
        } catch (e) {
            fail('Value stored by AuthService.authorize() could not be parsed.');
        }

        // Expect redirect URL to be correct
        const correctURL = `https://discordapp.com/api/oauth2/authorize?response_type=code&scope=${DISCORD_SCOPE}&client_id=${DISCORD_CLIENT_ID}&redirect_uri=origin/auth&state=${state}&prompt=none`;
        expect(service['externalRedirect']).toHaveBeenCalledWith(correctURL);
    });

    it("#authorize functions when remember=true", () => {
        // Call function
        service.authorize(true);

        // Expect session storage to have an entry
        expect(sessionStorage.length).toBe(1);

        // Determine state variable
        const state: string = sessionStorage.key(0);

        // Expect value at state variable to be correct
        const value: string = sessionStorage.getItem(state);
        expect(value).toBeDefined();
        try {
            const { redirect, remember } = JSON.parse(value);
            expect(redirect).toBe("/somewhere");
            expect(remember).toBeTrue();
        } catch (e) {
            fail('Value stored by AuthService.authorize() could not be parsed.');
        }

        // Expect redirect URL to be correct
        const correctURL = `https://discordapp.com/api/oauth2/authorize?response_type=code&scope=${DISCORD_SCOPE}&client_id=${DISCORD_CLIENT_ID}&redirect_uri=origin/auth&state=${state}&prompt=none`;
        expect(service['externalRedirect']).toHaveBeenCalledWith(correctURL);
    });
});
