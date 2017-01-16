/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalStatsService } from './global-stats.service';

describe('GlobalStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalStatsService]
    });
  });

  it('should ...', inject([GlobalStatsService], (service: GlobalStatsService) => {
    expect(service).toBeTruthy();
  }));
});
