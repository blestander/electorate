import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleResultsComponent } from './simple-results.component';

describe('SimpleResultsComponent', () => {
    let component: SimpleResultsComponent;
    let fixture: ComponentFixture<SimpleResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SimpleResultsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
