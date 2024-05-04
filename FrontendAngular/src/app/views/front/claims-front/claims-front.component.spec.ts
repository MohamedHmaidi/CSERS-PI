import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFrontComponent } from './claims-front.component';

describe('ClaimsFrontComponent', () => {
  let component: ClaimsFrontComponent;
  let fixture: ComponentFixture<ClaimsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
