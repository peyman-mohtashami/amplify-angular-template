import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRetractionList } from './user-retraction-list';

describe('UserRetractionList', () => {
  let component: UserRetractionList;
  let fixture: ComponentFixture<UserRetractionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRetractionList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRetractionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
