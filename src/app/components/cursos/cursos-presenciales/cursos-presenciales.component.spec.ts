import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPresencialesComponent } from './cursos-presenciales.component';

describe('CursosPresencialesComponent', () => {
  let component: CursosPresencialesComponent;
  let fixture: ComponentFixture<CursosPresencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosPresencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosPresencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
