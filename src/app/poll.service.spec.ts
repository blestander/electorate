import { TestBed } from '@angular/core/testing';
import { PollService } from './poll.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Poll } from './poll';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('PollService', () => {
    let service: PollService;
    let authService;
    let router;
    let httpController: HttpTestingController;

    beforeEach(() => {
        // Create AuthService spy
        authService = jasmine.createSpyObj('AuthService', ['reportLoginStatus'])

        // Create Router spy
        router = jasmine.createSpyObj('Router', ['navigateByUrl']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClient,
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router }
            ],
        });

        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PollService);
    });

    it("should be created", () => {
        expect(service).toBeDefined();
    });

    it('#getPoll can retrieve a poll', () => {
        // Ultimate response data
        let responseData: Poll = {
            id: 'alpha',
            name: 'Test Poll',
            options: ["A", "B", "C"],
            method: "fptp",
            own: true,
            finished: false,
            has_voted: false,
            can_vote: true,
        }

        // Request poll at ID 'alpha'
        service.getPoll("alpha").subscribe({
            next: poll => expect(poll).toBe(responseData),
            error: error => fail(`Expected poll; got error code ${error.status}`)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha");

        // Expecting the request to be a GET request
        expect(request.request.method).toEqual("GET");

        // Send response
        request.flush(responseData);
    });

    it('#getPoll handles unauthenticated users', () => {
        // Send the request
        service.getPoll("beta").subscribe({
            next: poll => fail('Expected error 401; got poll'),
            error: error => expect(error.status).toEqual(401)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta");

        // Expecting the request to be a GET request
        expect(request.request.method).toEqual("GET");

        // Send response
        request.flush('Not logged in', { status: 401, statusText: "Unauthorized"});

        // Verify AuthService notified
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it('#getPoll passes through errors', () => {
        // Send the request
        service.getPoll("gamma").subscribe({
            next: poll => fail('Expected error 500; got poll'),
            error: error => expect(error.status).toEqual(500)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/gamma");

        // Expecting the request to be a GET request
        expect(request.request.method).toEqual("GET");

        // Send response
        request.flush('Server error', { status: 500, statusText: "Server error"});
    });

    it('#castVote succeeds correctly', () => {
        // Build the initial parameters
        let choice = ["A", "B", "C"];
        let guild_proof = "proof";

        // Send the request
        service.castVote("alpha", choice, guild_proof).subscribe({
            next: poll => {
                expect(poll.choice).toEqual(choice);
                expect(poll.can_vote).toBeFalse();
                expect(poll.has_voted).toBeTrue();
            }
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha/vote");

        // Expecting a request to be a POST request
        expect(request.request.method).toEqual("POST");

        // Expecting the body to be structured correctly
        expect(request.request.body.choice).toBe(choice);
        expect(request.request.body.guild_proof).toBe(guild_proof);

        // Send response
        request.flush({
            choice: choice,
            can_vote: false,
            has_voted: true,
        });
    });

    it("#castVote passes through errors", () => {
        // Build the initial parameters
        let choice = "The only choice";
        let guild_proof = "Not really proof";

        // Send the request
        service.castVote("beta", choice, guild_proof).subscribe({
            next: poll => fail('Expected error; got poll'),
            error: error => expect(error.status).toBe(404),
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/vote");

        // Send response
        request.flush('Not found', { status: 404, statusText: "Not found"});
    });

    it("#castVote notifies AuthService on unauthenticated user", () => {
        let choice = "Who cares?";
        let guild_proof = "Who cares?";

        // Send the request
        service.castVote("gamma", choice, guild_proof).subscribe({
            next: poll => fail('Expected error; got poll'),
            error: error => {
                expect(error.status).toBe(401);
                expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
            }
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/gamma/vote");

        // Send response
        request.flush('Unauthorized', { status: 401, statusText: "Unauthorized" });
    });

    it("#finishPoll succeed correctly", () => {
        // Send the request
        service.finishPoll("alpha").subscribe({
            next: poll => {
                expect(poll.finished).toBeTrue();
                expect(poll.results.A).toBe(5);
                expect(poll.results.B).toBe(4);
            },
            error: error => fail(`Expected poll; got error code ${error.status}`)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha/finish");

        // Expecting the request to be a POST request
        expect(request.request.method).toBe("POST");

        // Expecting empty body of request
        expect(request.request.body).toEqual({});

        // Send response
        request.flush({
            finished: true,
            results: {
                "A": 5,
                "B": 4
            }
        });
    });

    it("#finishPoll passes through errors", () => {
        // Send the request
        service.finishPoll("beta").subscribe({
            next: poll => fail("Expected error; got poll"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to be the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/finish");

        // Send response
        request.flush('Server error', {status: 500, statusText: "Server error"});
    });

    it("#finishPoll informs AuthService of 401 error", () => {
        // Send the request
        service.finishPoll("gamma").subscribe({
            next: poll => fail("Expected 401; got poll"),
            error: error => expect(authService.reportLoginStatus).toHaveBeenCalledWith(false)
        });

        // Expecting a request to be the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/gamma/finish");

        // Send response
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});
    });

    it("#createPoll succeeds correctly", () => {
        // Send the request
        service.createPoll({
            name: "Poll name",
            description: "Description",
        });

        // Expecting a request to be the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/create");

        // Expecting the request to be a POST request
        expect(request.request.method).toBe("POST");

        // Send response
        request.flush("", {
            status: 204,
            statusText: "No content",
            headers: {
                "Location": "/poll/alpha"
            }
        });

        // Expecting a call to route to /poll/alpha
        expect(router.navigateByUrl).toHaveBeenCalledWith("/poll/alpha");
    });

    afterAll(() => {
        // Verify no oustanding requests
        httpController.verify();
    });
});
