import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChangeComponent } from './state-change.component';

describe('StateChangeComponent', () => {
    let component: StateChangeComponent;
    let fixture: ComponentFixture<StateChangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StateChangeComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StateChangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
