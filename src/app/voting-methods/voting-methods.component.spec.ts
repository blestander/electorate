import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingMethodsComponent } from './voting-methods.component';

describe('VotingMethodsComponent', () => {
    let component: VotingMethodsComponent;
    let fixture: ComponentFixture<VotingMethodsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VotingMethodsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VotingMethodsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
