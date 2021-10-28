import { PaymentService } from './service/payment.service';
import { PaymentController } from './controller/payment.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
