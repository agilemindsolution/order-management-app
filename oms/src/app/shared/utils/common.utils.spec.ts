import { TestBed } from '@angular/core/testing';

import { CommonUtils } from './common-utils';

describe('CommonUtils', () => {
  let service: CommonUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
