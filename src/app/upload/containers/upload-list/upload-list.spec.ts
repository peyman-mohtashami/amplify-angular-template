import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadList } from './upload-list';

describe('UploadList', () => {
  let component: UploadList;
  let fixture: ComponentFixture<UploadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadList],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
