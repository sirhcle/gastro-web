import { TestBed } from '@angular/core/testing';

import { VideosServicesService } from './videos-services.service';

describe('VideosServicesService', () => {
  let service: VideosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
