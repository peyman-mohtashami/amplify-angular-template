import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStatus } from './upload-status';

describe('UploadStatus', () => {
  let component: UploadStatus;
  let fixture: ComponentFixture<UploadStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
