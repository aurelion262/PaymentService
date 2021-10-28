import { AuthMiddleware } from './../../middleware/auth.middleware';
import { PaymentModule } from './../payment/payment.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from 'src/filters/exceptions.filter';

@Module({
  imports: [PaymentModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
