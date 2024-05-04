import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingContentComponent } from './add-training-content.component';

describe('AddTrainingContentComponent', () => {
  let component: AddTrainingContentComponent;
  let fixture: ComponentFixture<AddTrainingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
