import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderinfoComponent } from './traderinfo.component';

describe('TraderinfoComponent', () => {
  let component: TraderinfoComponent;
  let fixture: ComponentFixture<TraderinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraderinfoComponent]
    });
    fixture = TestBed.createComponent(TraderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
