import { TestBed } from '@angular/core/testing';

import { GuildService } from './guild.service';

xdescribe('GuildService', () => {
    let service: GuildService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GuildService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
