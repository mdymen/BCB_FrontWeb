import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarcampeonatoComponent } from './cargarcampeonato.component';

describe('CargarcampeonatoComponent', () => {
  let component: CargarcampeonatoComponent;
  let fixture: ComponentFixture<CargarcampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarcampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarcampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
