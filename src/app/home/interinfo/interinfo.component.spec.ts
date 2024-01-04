import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterinfoComponent } from './interinfo.component';

describe('InterinfoComponent', () => {
  let component: InterinfoComponent;
  let fixture: ComponentFixture<InterinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterinfoComponent]
    });
    fixture = TestBed.createComponent(InterinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
