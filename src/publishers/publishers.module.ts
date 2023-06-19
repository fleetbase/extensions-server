import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherEntity, PublisherSchema } from './entities/publisher.entity';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: PublisherEntity.name, schema: PublisherSchema }])],
    controllers: [PublishersController],
    providers: [PublishersService],
})
export class PublishersModule {}
