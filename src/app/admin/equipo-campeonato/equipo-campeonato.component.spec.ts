import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoCampeonatoComponent } from './equipo-campeonato.component';

describe('EquipoCampeonatoComponent', () => {
  let component: EquipoCampeonatoComponent;
  let fixture: ComponentFixture<EquipoCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
