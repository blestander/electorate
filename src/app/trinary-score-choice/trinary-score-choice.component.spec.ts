import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinaryScoreChoiceComponent } from './trinary-score-choice.component';

describe('TrinaryScoreChoiceComponent', () => {
    let component: TrinaryScoreChoiceComponent;
    let fixture: ComponentFixture<TrinaryScoreChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TrinaryScoreChoiceComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrinaryScoreChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
