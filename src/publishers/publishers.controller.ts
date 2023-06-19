import { Controller, Get, Post, Render, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublishersService } from './publishers.service';
import { PublisherEntity } from './entities/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';

@Controller('publishers')
export class PublishersController {
    constructor(private readonly publishersService: PublishersService) {}

    @Get('register')
    @Render('publishers/register')
    register() {
        // The object returned here will be available in your view
        return { message: 'Hello World!' };
    }

    @Get('login')
    @Render('publishers/login')
    login() {
        // The object returned here will be available in your view
        return { message: 'Hello World!' };
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('logo'))
    async create(@UploadedFile() file, @Body() createPublisherDto: CreatePublisherDto): Promise<PublisherEntity> {
        return this.publishersService.create(createPublisherDto, file);
    }
}
