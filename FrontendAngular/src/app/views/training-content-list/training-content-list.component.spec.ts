import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingContentListComponent } from './training-content-list.component';

describe('TrainingContentListComponent', () => {
  let component: TrainingContentListComponent;
  let fixture: ComponentFixture<TrainingContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
