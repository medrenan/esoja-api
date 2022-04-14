import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';

export function globalAppConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });
}
