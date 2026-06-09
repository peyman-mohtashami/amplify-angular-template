import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRetractionNew } from './user-retraction-new';

describe('UserRetractionNew', () => {
  let component: UserRetractionNew;
  let fixture: ComponentFixture<UserRetractionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRetractionNew],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRetractionNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
