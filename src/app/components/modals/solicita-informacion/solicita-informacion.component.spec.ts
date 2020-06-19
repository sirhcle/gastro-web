import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitaInformacionComponent } from './solicita-informacion.component';

describe('SolicitaInformacionComponent', () => {
  let component: SolicitaInformacionComponent;
  let fixture: ComponentFixture<SolicitaInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitaInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
