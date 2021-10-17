import { TestBed } from '@angular/core/testing';

import { CrudFilmeService } from './crud-filme.service';

describe('CrudFilmeService', () => {
  let service: CrudFilmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudFilmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
