import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { engine as hbs } from 'express-handlebars';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const viewsPath = join(__dirname, '..', 'views');

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(viewsPath);
    app.setViewEngine('hbs');

    app.engine(
        'hbs',
        hbs({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: join(viewsPath, 'layouts'),
            partialsDir: join(viewsPath, 'partials'),
        })
    );

    await app.listen(3000);
}
bootstrap();
