import { TestBed } from '@angular/core/testing';

import { TrainingContentService } from './training-content.service';

describe('TrainingContentService', () => {
  let service: TrainingContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
