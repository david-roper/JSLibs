import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'bun:test';

import { AjvService } from '../ajv.service';

describe('AjvService', () => {
  let ajvService: AjvService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AjvService]
    }).compile();
    ajvService = moduleRef.get(AjvService);
  });

  it('should be defined', () => {
    expect(ajvService).toBeDefined();
  });
});
