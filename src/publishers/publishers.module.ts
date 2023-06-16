import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService]
})
export class PublishersModule {}
