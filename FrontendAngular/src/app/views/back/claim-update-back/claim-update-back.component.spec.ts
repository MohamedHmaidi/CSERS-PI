import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimUpdateBackComponent } from './claim-update-back.component';

describe('ClaimUpdateBackComponent', () => {
  let component: ClaimUpdateBackComponent;
  let fixture: ComponentFixture<ClaimUpdateBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimUpdateBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimUpdateBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
