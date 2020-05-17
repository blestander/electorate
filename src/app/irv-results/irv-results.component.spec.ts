import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRVResultsComponent } from './irv-results.component';

describe('IRVResultsComponent', () => {
    let component: IRVResultsComponent;
    let fixture: ComponentFixture<IRVResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IRVResultsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IRVResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
