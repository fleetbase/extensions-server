import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublishersModule } from './publishers/publishers.module';
import { ExtensionsModule } from './extensions/extensions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/fleetbase-extensions'),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        PublishersModule,
        ExtensionsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {}
