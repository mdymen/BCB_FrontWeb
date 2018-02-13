import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEquipoComponent } from './adicionar-equipo.component';

describe('AdicionarEquipoComponent', () => {
  let component: AdicionarEquipoComponent;
  let fixture: ComponentFixture<AdicionarEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
