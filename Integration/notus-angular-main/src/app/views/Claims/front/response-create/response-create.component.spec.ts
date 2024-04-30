import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseCreateComponent } from './response-create.component';

describe('ResponseCreateComponent', () => {
  let component: ResponseCreateComponent;
  let fixture: ComponentFixture<ResponseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
