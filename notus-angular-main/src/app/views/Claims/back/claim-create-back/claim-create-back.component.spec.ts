import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCreateBackComponent } from './claim-create-back.component';

describe('ClaimCreateBackComponent', () => {
  let component: ClaimCreateBackComponent;
  let fixture: ComponentFixture<ClaimCreateBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCreateBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCreateBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
