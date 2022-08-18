import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = process.env.PORT || 5000;
  app.enableCors();
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });
}
bootstrap();
