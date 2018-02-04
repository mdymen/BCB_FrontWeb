import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalpitarrodadaComponent } from './palpitarrodada.component';

describe('PalpitarrodadaComponent', () => {
  let component: PalpitarrodadaComponent;
  let fixture: ComponentFixture<PalpitarrodadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalpitarrodadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalpitarrodadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
