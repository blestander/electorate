import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonvoterComponent } from './nonvoter.component';

describe('NonvoterComponent', () => {
    let component: NonvoterComponent;
    let fixture: ComponentFixture<NonvoterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NonvoterComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NonvoterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
