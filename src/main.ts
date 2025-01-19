import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,            // Removes properties not defined in DTO
      forbidNonWhitelisted: false, // Throws error for extra properties
      transform: true,            // Transforms payloads into DTO instances
      transformOptions: { enableImplicitConversion: true }, // Allows automatic type conversion
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization,in-auth-token',
    credentials: true // Set to true if your frontend needs cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
