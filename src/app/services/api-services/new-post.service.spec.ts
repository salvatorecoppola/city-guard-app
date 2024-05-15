import { TestBed } from '@angular/core/testing';

import { NewPostService } from './new-post.service';

describe('NewPostServicesService', () => {
  let service: NewPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
