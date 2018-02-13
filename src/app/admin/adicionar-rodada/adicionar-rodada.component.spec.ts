import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRodadaComponent } from './adicionar-rodada.component';

describe('AdicionarRodadaComponent', () => {
  let component: AdicionarRodadaComponent;
  let fixture: ComponentFixture<AdicionarRodadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarRodadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarRodadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
