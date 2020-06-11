import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterRowComponent } from './voter-row.component';

xdescribe('VoterRowComponent', () => {
    let component: VoterRowComponent;
    let fixture: ComponentFixture<VoterRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ VoterRowComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
