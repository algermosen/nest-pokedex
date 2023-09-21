import { Body, Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedDto } from './dto/seed.dto';

@Controller({
  path: 'seed',
  version: '1',
})
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  loadData(@Body() executeSeedDto: SeedDto) {
    return this.seedService.loadData(executeSeedDto);
  }
}
