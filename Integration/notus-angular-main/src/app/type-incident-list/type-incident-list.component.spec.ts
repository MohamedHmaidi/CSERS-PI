import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIncidentListComponent } from './type-incident-list.component';

describe('TypeIncidentListComponent', () => {
  let component: TypeIncidentListComponent;
  let fixture: ComponentFixture<TypeIncidentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeIncidentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIncidentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
