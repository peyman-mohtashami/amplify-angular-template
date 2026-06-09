import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTask } from './upload-task';

describe('UploadTask', () => {
  let component: UploadTask;
  let fixture: ComponentFixture<UploadTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTask],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
