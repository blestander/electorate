import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedOptionComponent } from './ranked-option.component';

describe('RankedOptionComponent', () => {
    let component: RankedOptionComponent;
    let fixture: ComponentFixture<RankedOptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RankedOptionComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RankedOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
