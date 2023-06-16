import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublishersModule } from './publishers/publishers.module';
import { ExtensionsModule } from './extensions/extensions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        PublishersModule,
        ExtensionsModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {}
