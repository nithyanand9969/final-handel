import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTranscationComponent } from './all-transcation.component';

describe('AllTranscationComponent', () => {
  let component: AllTranscationComponent;
  let fixture: ComponentFixture<AllTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTranscationComponent]
    });
    fixture = TestBed.createComponent(AllTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
