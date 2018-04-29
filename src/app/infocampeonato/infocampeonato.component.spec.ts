import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocampeonatoComponent } from './infocampeonato.component';

describe('InfocampeonatoComponent', () => {
  let component: InfocampeonatoComponent;
  let fixture: ComponentFixture<InfocampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfocampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfocampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
