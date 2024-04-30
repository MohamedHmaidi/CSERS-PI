import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimStatsBackComponent } from './claim-stats-back.component';

describe('ClaimStatsBackComponent', () => {
  let component: ClaimStatsBackComponent;
  let fixture: ComponentFixture<ClaimStatsBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimStatsBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimStatsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
