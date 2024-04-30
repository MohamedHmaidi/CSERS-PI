import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePerClaimComponent } from './response-per-claim.component';

describe('ResponsePerClaimComponent', () => {
  let component: ResponsePerClaimComponent;
  let fixture: ComponentFixture<ResponsePerClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsePerClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsePerClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
