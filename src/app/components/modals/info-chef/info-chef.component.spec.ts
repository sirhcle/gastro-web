import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChefComponent } from './info-chef.component';

describe('InfoChefComponent', () => {
  let component: InfoChefComponent;
  let fixture: ComponentFixture<InfoChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
