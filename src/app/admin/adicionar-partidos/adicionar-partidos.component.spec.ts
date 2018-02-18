import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPartidosComponent } from './adicionar-partidos.component';

describe('AdicionarPartidosComponent', () => {
  let component: AdicionarPartidosComponent;
  let fixture: ComponentFixture<AdicionarPartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarPartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
