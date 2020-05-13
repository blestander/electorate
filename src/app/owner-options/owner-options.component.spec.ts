import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOptionsComponent } from './owner-options.component';

describe('OwnerOptionsComponent', () => {
    let component: OwnerOptionsComponent;
    let fixture: ComponentFixture<OwnerOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ OwnerOptionsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OwnerOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
