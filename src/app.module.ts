import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type } from 'os';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FonctionsModule } from './fonctions/fonctions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port:configService.get<number>('DB_PORT'),
        username : configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,

       }),
       inject: [ConfigService],
    }),
    FonctionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
