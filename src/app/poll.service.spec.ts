import { TestBed } from '@angular/core/testing';
import { PollService } from './poll.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
});
