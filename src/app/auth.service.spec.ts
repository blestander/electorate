import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    beforeEach(() => {
        // Create router spy
        router = jasmine.createSpyObj(
            'Router',
            ['navigateByUrl'],
            { url: 'somewhere' }
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
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });
});
