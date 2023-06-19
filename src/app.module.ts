import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
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
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
        }),
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
