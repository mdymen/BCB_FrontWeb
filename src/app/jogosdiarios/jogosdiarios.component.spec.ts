import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosdiariosComponent } from './jogosdiarios.component';

describe('JogosdiariosComponent', () => {
  let component: JogosdiariosComponent;
  let fixture: ComponentFixture<JogosdiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogosdiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosdiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
