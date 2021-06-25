import { TestBed } from '@angular/core/testing';

import { InterpretadorService } from './interpretador.service';

describe('InterpretadorService', () => {
  let service: InterpretadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpretadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
