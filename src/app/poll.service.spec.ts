import { TestBed } from '@angular/core/testing';
import { PollService } from './poll.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Poll } from './poll';
import { AuthService } from './auth.service';
import { Voter } from './voter';

describe('PollService', () => {
    let service: PollService;
    let authService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        // Create AuthService spy
        authService = jasmine.createSpyObj('AuthService', ['reportLoginStatus']);

        // Setup spy on window
        spyOn(window, "alert");

        // Configure test bed
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthService, useValue: authService },
            ],
        });

        // Get the objects we need to test
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
        }).subscribe({
            next: path => expect(path).toBe("/poll/alpha"),
            error: error => fail(`Expected path; got error code ${error.status}`)
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
    });

    it("#createPoll passes through errors", () => {
        // Send the request
        service.createPoll({
            name: "Who cares?"
        }).subscribe({
            next: path => fail(`Expected error; got path ${path}`),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/create");

        // Respond to request
        request.flush("Server error", {status: 500, statusText: "Server error"});
    });

    it("#createPoll handles unauthenticaed users properly", () => {
        // Send the request
        service.createPoll({
            name: "Who cares?"
        }).subscribe({
            next: path => fail(`Expected error; got path ${path}`),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to the correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/create");

        // Respond to request
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});

        // Expect AuthService to be informed
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#listPolls succeeds correctly", () => {
        // Send the request
        service.listPolls().subscribe({
            next: polls => {
                expect(polls.length).toBe(2);
                expect(polls[0].name).toBe("Poll 1");
                expect(polls[1].name).toBe("Poll 2");
            },
            error: error => fail("Expected array of polls; got error")
        });

        // Expecting a request to corerct URL
        const request = httpController.expectOne("http://localhost:8080/api/polls");

        // Expecting request to be a GET request
        expect(request.request.method).toBe("GET");

        // Respond to request
        request.flush([{name: "Poll 1"}, {name: "Poll 2"}]);
    });

    it("#listPolls passes throught errors", () => {
        // Send the request
        service.listPolls().subscribe({
            next: polls => fail("Expected error; got array of polls"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/polls");

        // Respond to request
        request.flush("Server error", {status: 500, statusText: "Server error"});
    });

    it("#listPolls informs AuthService of 401", () => {
        // Send the request
        service.listPolls().subscribe({
            next: polls => fail("Expected error; got array of polls"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/polls");

        // Respond to request
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});

        // Expecting call to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#deletePoll succeeds correctly", () => {
        // Send the request
        service.deletePoll("alpha").subscribe({
            next: res => expect(res).toBeNull(),
            error: error => fail("Expected nothing; got error")
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha");

        // Expecting request to be a DELETE request
        expect(request.request.method).toBe("DELETE");

        // Respond to request
        request.flush(null);
    });

    it("#deletePoll passes through errors", () => {
        // Send the request
        service.deletePoll("beta").subscribe({
            next: () => fail("Expected error; got success"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta");

        // Respond to request
        request.flush("Server error", {status: 500, statusText: "Server error"});
    });

    it("#deletePoll handles 401s correctly", () => {
        // Send the request
        service.deletePoll("beta").subscribe({
            next: () => fail("Expected error; got success"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta");

        // Response to request
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});

        // Expecting a call to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#getHistory succeeds correctly", () => {
        // Response
        let response: Poll[] = [
            { name: "Poll 1" },
            { name: "Poll 2" }
        ];

        // Send the request
        service.getHistory().subscribe({
            next: (res: Poll[]) => {
                expect(res.length).toBe(2);
                expect(res[0].name).toBe("Poll 1");
                expect(res[1].name).toBe("Poll 2");
            },
            error: error => fail(`Expected array of polls; got error code ${error.status}`)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/history");

        // Expecting request to be a GET request
        expect(request.request.method).toBe("GET");

        // Respond to request
        request.flush(response);
    });

    it("#getHistory passes through errors", () => {
        // Send the request
        service.getHistory().subscribe({
            next: () => fail("Expected error; got list of polls"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/history");

        // Respond to request
        request.flush("Server error", {status: 500, statusText: "Server error"});
    });

    it("#getHistory handles 401s correctly", () => {
        // Send the request
        service.getHistory().subscribe({
            next: () => fail("Expected error; got list of polls"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/history");

        // Respond to request
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});

        // Expecting call to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#getVoters succeeds correctly", () => {
        // Make response
        let response: Voter[] = [
            { name: "Voter 1" },
            { name: "Voter 2" },
        ];

        // Send the request
        service.getVoters("alpha").subscribe({
            next: voters => {
                expect(voters.length).toBe(2);
                expect(voters[0].name).toBe("Voter 1");
                expect(voters[1].name).toBe("Voter 2");
            },
            error: error => fail(`Expected array of voters; got error code ${error.status}`)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha/voters");

        // Expecting request to be a GET request
        expect(request.request.method).toBe("GET");

        // Respond to request
        request.flush(response);
    });

    it("#getVoters passes through errors", () => {
        // Send the request
        service.getVoters("beta").subscribe({
            next: () => fail("Expected error; got array of voters"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/voters");

        // Respond to request
        request.flush("Server error", {status: 500, statusText: "Server error"});
    });

    it("#getVoters handles 401s correctly", () => {
        // Send the request
        service.getVoters("beta").subscribe({
            next: () => fail("Expected error; got array of voters"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/voters");

        // Respond to request
        request.flush("Unauthorized", {status: 401, statusText: "Unauthorized"});

        // Expect call out to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#setWebhook succeeds correctly", () => {
        // Send the request
        service.setWebhook("alpha", "dummy_webhook").subscribe({
            next: poll => expect(poll.webhook).toBe("dummy_webhook"),
            error: error => fail(`Expected poll; got error code ${error.status}`)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha/webhook");

        // Expecting request to be a POST request
        expect(request.request.method).toBe("POST");

        // Respond to request
        request.flush({
            webhook: "dummy_webhook"
        });
    });

    it("#setWebhook passes through errors", () => {
        // Send the request
        service.setWebhook("beta", "dummy_webhook").subscribe({
            next: () => fail("Expected error; got poll"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/webhook");

        // Respond to request
        request.flush("", {status: 500, statusText: ""});
    });

    it("#setWebhook handles 401s correctly", () => {
        // Send the request
        service.setWebhook("beta", "dummy_webhook").subscribe({
            next: () => fail("Expected error; got poll"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/webhook");

        // Respond to request
        request.flush("", {status: 401, statusText: ""});

        // Expect call out to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    it("#removeWebhook succeeds correctly", () => {
        // Send the request
        service.removeWebhook("alpha").subscribe({
            next: poll => expect(poll.webhook).toBe(""),
            error: error => fail(`Expected poll; got error code ${error.status}`)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/alpha/webhook");

        // Expecting request to be a POST request
        expect(request.request.method).toBe("DELETE");

        // Respond to request
        request.flush({
            webhook: ""
        });
    });

    it("#removeWebhook passes through errors", () => {
        // Send the request
        service.removeWebhook("beta").subscribe({
            next: () => fail("Expected error; got poll"),
            error: error => expect(error.status).toBe(500)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/webhook");

        // Respond to request
        request.flush("", {status: 500, statusText: ""});
    });

    it("#removeWebhook handles 401s correctly", () => {
        // Send the request
        service.removeWebhook("beta").subscribe({
            next: () => fail("Expected error; got poll"),
            error: error => expect(error.status).toBe(401)
        });

        // Expecting a request to correct URL
        const request = httpController.expectOne("http://localhost:8080/api/poll/beta/webhook");

        // Respond to request
        request.flush("", {status: 401, statusText: ""});

        // Expect call out to AuthService
        expect(authService.reportLoginStatus).toHaveBeenCalledWith(false);
    });

    afterEach(() => {
        // Verify no oustanding requests
        httpController.verify();
    });
});
