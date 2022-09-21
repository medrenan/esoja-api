import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalAppConfig } from './utils/functions/global.config.fn';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  globalAppConfig(app);

  const whitelist = ['http://localhost:3333'];

  app.enableCors({
    credentials: true,
    optionsSuccessStatus: 204,
    origin: whitelist,
    methods: 'GET, POST, PUT, DELETE, UPDATE, OPTIONS',
  });

  await app.listen(process.env.PORT || 3333);

  console.log('Server on');
  console.log(`env: .env.${process.env.NODE_ENV}`);
}
bootstrap();
