import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinfoComponent } from './companyinfo.component';

describe('CompanyinfoComponent', () => {
  let component: CompanyinfoComponent;
  let fixture: ComponentFixture<CompanyinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyinfoComponent]
    });
    fixture = TestBed.createComponent(CompanyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
