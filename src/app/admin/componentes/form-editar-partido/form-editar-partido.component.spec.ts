import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarPartidoComponent } from './form-editar-partido.component';

describe('FormEditarPartidoComponent', () => {
  let component: FormEditarPartidoComponent;
  let fixture: ComponentFixture<FormEditarPartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditarPartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
