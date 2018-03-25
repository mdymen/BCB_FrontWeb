import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetrodadaComponent } from './setrodada.component';

describe('SetrodadaComponent', () => {
  let component: SetrodadaComponent;
  let fixture: ComponentFixture<SetrodadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetrodadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetrodadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
