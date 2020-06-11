import { TestBed } from '@angular/core/testing';
import { PollService } from './poll.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../environments/environment';
import { Poll } from './poll';

describe('PollService', () => {
    let service: PollService;
    let httpClient: HttpClient;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [HttpClient],
        });

        httpClient = TestBed.inject(HttpClient);
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PollService);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    describe('getPoll()', () => {

        it('can retrieve a poll', () => {
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

            // Verify no outstanding requests
            httpController.verify();
        });
    });
});
