import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { EnsureAuthenticated } from './providers/middleware/ensure.authenticated.middleware';
import { ProvidersModule } from './providers/providers.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    ProvidersModule,
    ModulesModule,
    UtilsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {
  ensureAuthenticatedExclude = [{ path: 'v1/(.*)', method: RequestMethod.ALL }];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .exclude(...this.ensureAuthenticatedExclude)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
