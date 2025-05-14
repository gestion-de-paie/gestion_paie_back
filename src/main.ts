import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedModePaiement } from './seeds/mode_paiement.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // mesage d'erreur validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true,
    forbidNonWhitelisted: true
  }))
  

  // activation de swagger
  const config = new DocumentBuilder()
  .setTitle('Gestion de paie')
  .setDescription('Gestion de paie back API REST')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app , config);
  SwaggerModule.setup('api', app , documentFactory);
  
  // seeder data
  const dataSource = app.get(DataSource);
  await seedModePaiement(dataSource);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
