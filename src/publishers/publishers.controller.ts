import { Controller, Get, Render } from '@nestjs/common';

@Controller('publishers')
export class PublishersController {
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
}
