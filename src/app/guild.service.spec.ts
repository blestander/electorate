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

    it("#getGuilds succeeds successfully", () => {
        // Send request
        service.getGuilds().subscribe({
            next: guilds => {
                expect(guilds.length).toBe(2);
                expect(guilds[0].name).toBe("Guild 1");
                expect(guilds[1].name).toBe("Guild 2");
            },
            error: error => fail(`Expected array of guilds; got error code ${error.status}`)
        });

        // Expecting request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/guilds");

        // Expecting request to be GET request
        expect(request.request.method).toBe("GET");

        // Respond to request
        request.flush([
            { name: "Guild 1" },
            { name: "Guild 2" },
        ]);
    });

    afterEach(() => {
        // Verify that there are no outstanding requests
        httpController.verify();
    })
});
