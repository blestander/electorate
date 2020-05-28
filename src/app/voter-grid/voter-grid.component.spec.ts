import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterGridComponent } from './voter-grid.component';

describe('VoterGridComponent', () => {
    let component: VoterGridComponent;
    let fixture: ComponentFixture<VoterGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VoterGridComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
