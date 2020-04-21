import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRequiredComponent } from './auth-required.component';

describe('AuthRequiredComponent', () => {
    let component: AuthRequiredComponent;
    let fixture: ComponentFixture<AuthRequiredComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AuthRequiredComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthRequiredComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
