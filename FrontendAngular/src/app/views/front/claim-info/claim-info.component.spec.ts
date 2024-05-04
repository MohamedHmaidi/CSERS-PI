import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimInfoComponent } from './claim-info.component';

describe('ClaimInfoComponent', () => {
  let component: ClaimInfoComponent;
  let fixture: ComponentFixture<ClaimInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
