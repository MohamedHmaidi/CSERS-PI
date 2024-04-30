import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimInfoBackComponent } from './claim-info-back.component';

describe('ClaimInfoBackComponent', () => {
  let component: ClaimInfoBackComponent;
  let fixture: ComponentFixture<ClaimInfoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimInfoBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInfoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
