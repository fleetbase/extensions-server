import { Controller, Get, Post, Render, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublishersService } from './publishers.service';

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
    async register(
        @UploadedFile() logo: Express.Multer.File,
        @Body('name') name: string,
        @Body('about') about: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('website') website: string
    ) {
        // Validate input...
        // Hash password...

        const publisher = {
            name,
            about,
            email,
            password,
            website,
            logo: logo.buffer, // store the file's content as a Buffer for MongoDB
        };

        await this.publishersService.create(publisher);

        // Return response...
    }
}
