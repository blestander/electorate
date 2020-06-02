import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingMethodSummaryComponent } from './voting-method-summary.component';

describe('VotingMethodSummaryComponent', () => {
  let component: VotingMethodSummaryComponent;
  let fixture: ComponentFixture<VotingMethodSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingMethodSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingMethodSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
