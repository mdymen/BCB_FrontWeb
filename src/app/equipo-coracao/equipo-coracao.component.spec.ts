import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoCoracaoComponent } from './equipo-coracao.component';

describe('EquipoCoracaoComponent', () => {
  let component: EquipoCoracaoComponent;
  let fixture: ComponentFixture<EquipoCoracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoCoracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoCoracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
