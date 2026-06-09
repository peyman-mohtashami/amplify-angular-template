import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadManager } from './upload-manager';

describe('UploadManager', () => {
  let component: UploadManager;
  let fixture: ComponentFixture<UploadManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadManager],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
