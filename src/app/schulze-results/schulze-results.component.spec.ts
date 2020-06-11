import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchulzeResultsComponent } from './schulze-results.component';

xdescribe('SchulzeResultsComponent', () => {
    let component: SchulzeResultsComponent;
    let fixture: ComponentFixture<SchulzeResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SchulzeResultsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchulzeResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
