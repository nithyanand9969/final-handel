import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTranscationComponent } from './manage-transcation.component';

describe('ManageTranscationComponent', () => {
  let component: ManageTranscationComponent;
  let fixture: ComponentFixture<ManageTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTranscationComponent]
    });
    fixture = TestBed.createComponent(ManageTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
