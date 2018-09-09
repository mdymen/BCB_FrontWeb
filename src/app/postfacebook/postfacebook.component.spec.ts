import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostfacebookComponent } from './postfacebook.component';

describe('PostfacebookComponent', () => {
  let component: PostfacebookComponent;
  let fixture: ComponentFixture<PostfacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostfacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostfacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
