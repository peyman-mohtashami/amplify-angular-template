import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNew } from './upload-new';

describe('UploadNew', () => {
  let component: UploadNew;
  let fixture: ComponentFixture<UploadNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNew],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
