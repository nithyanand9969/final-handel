import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostnewrequirmentComponent } from './postnewrequirment.component';

describe('PostnewrequirmentComponent', () => {
  let component: PostnewrequirmentComponent;
  let fixture: ComponentFixture<PostnewrequirmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostnewrequirmentComponent]
    });
    fixture = TestBed.createComponent(PostnewrequirmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
