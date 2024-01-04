import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderregisterComponent } from './traderregister.component';

describe('TraderregisterComponent', () => {
  let component: TraderregisterComponent;
  let fixture: ComponentFixture<TraderregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraderregisterComponent]
    });
    fixture = TestBed.createComponent(TraderregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
