import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para tu front en Vercel
  app.enableCors({
    origin: ['https://TU-FRONT.vercel.app'], // ← poné tu dominio real
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials: true,
  });

  // Parsear el body y transformar strings a number
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,                 // 👈 transforma "2" → 2
    transformOptions: { enableImplicitConversion: true }
  }));

  const port = process.env.PORT || 3000; // 👈 Render usa PORT
  await app.listen(port, '0.0.0.0');
}
bootstrap();
