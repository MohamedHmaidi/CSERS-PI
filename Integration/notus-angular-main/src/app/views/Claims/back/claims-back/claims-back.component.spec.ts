import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsBackComponent } from './claims-back.component';

describe('ClaimsBackComponent', () => {
  let component: ClaimsBackComponent;
  let fixture: ComponentFixture<ClaimsBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
