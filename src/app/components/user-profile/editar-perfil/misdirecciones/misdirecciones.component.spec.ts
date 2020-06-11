import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDireccionesComponent } from './misdirecciones.component';

describe('MisDireccionesComponent', () => {
  let component: MisDireccionesComponent;
  let fixture: ComponentFixture<MisDireccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisDireccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
