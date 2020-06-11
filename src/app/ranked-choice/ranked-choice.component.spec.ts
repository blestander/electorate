import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedChoiceComponent } from './ranked-choice.component';

xdescribe('RankedChoiceComponent', () => {
    let component: RankedChoiceComponent;
    let fixture: ComponentFixture<RankedChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RankedChoiceComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RankedChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
