import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmithResultsComponent } from './smith-results.component';

describe('SmithResultsComponent', () => {
    let component: SmithResultsComponent;
    let fixture: ComponentFixture<SmithResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SmithResultsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmithResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
