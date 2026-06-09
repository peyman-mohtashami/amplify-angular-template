import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRetraction } from './user-retraction';

describe('UserRetraction', () => {
  let component: UserRetraction;
  let fixture: ComponentFixture<UserRetraction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRetraction],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRetraction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
