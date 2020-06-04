import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedOptionListComponent } from './ranked-option-list.component';

describe('RankedOptionListComponent', () => {
    let component: RankedOptionListComponent;
    let fixture: ComponentFixture<RankedOptionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RankedOptionListComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RankedOptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
