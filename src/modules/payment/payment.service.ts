import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  handlePaymentRequest(): boolean {
    return Math.random() > 0.5;
  }
}
