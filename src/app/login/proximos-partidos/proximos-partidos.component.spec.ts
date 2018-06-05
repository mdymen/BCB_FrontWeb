import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosPartidosComponent } from './proximos-partidos.component';

describe('ProximosPartidosComponent', () => {
  let component: ProximosPartidosComponent;
  let fixture: ComponentFixture<ProximosPartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximosPartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosPartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
