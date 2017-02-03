/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreweryService } from './brewery.service';

describe('BreweryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreweryService]
    });
  });

  it('should ...', inject([BreweryService], (service: BreweryService) => {
    expect(service).toBeTruthy();
  }));
});
