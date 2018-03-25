import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCampeonatoComponent } from './adicionar-campeonato.component';

describe('AdicionarCampeonatoComponent', () => {
  let component: AdicionarCampeonatoComponent;
  let fixture: ComponentFixture<AdicionarCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
