import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Gestion de paie')
  .setDescription('Gestion de paie back API REST')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app , config);
  SwaggerModule.setup('api', app , documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
