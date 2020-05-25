import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenaryScoreChoiceComponent } from './senary-score-choice.component';

describe('SenaryScoreChoiceComponent', () => {
    let component: SenaryScoreChoiceComponent;
    let fixture: ComponentFixture<SenaryScoreChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SenaryScoreChoiceComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SenaryScoreChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
