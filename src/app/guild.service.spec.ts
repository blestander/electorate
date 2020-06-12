import { TestBed } from '@angular/core/testing';

import { GuildService } from './guild.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('GuildService', () => {
    let service: GuildService;
    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        // Create AuthService spy
        authService = jasmine.createSpyObj('AuthService', ['reportLoginStatus']);

        // Configure test bed
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provides: AuthService, useValue: authService}
            ],
        });

        // Get objects we need to test
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(GuildService);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });
});
