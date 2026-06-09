import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionNew } from './submission-new';

describe('SubmissionNew', () => {
  let component: SubmissionNew;
  let fixture: ComponentFixture<SubmissionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionNew],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmissionNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
