import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryScoreChoiceComponent } from './binary-score-choice.component';

describe('BinaryScoreChoiceComponent', () => {
    let component: BinaryScoreChoiceComponent;
    let fixture: ComponentFixture<BinaryScoreChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BinaryScoreChoiceComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BinaryScoreChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
