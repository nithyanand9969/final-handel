import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownentityComponent } from './dropdownentity.component';

describe('DropdownentityComponent', () => {
  let component: DropdownentityComponent;
  let fixture: ComponentFixture<DropdownentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownentityComponent]
    });
    fixture = TestBed.createComponent(DropdownentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
