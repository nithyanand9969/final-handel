import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediaryregisterComponent } from './intermediaryregister.component';

describe('IntermediaryregisterComponent', () => {
  let component: IntermediaryregisterComponent;
  let fixture: ComponentFixture<IntermediaryregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntermediaryregisterComponent]
    });
    fixture = TestBed.createComponent(IntermediaryregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
