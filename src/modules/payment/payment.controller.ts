import { PaymentService } from './payment.service';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandlePaymentResponse } from './format/payment.response';

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Get()
  handlePayment(): HandlePaymentResponse {
    return {
      success: this.paymentService.handlePaymentRequest(),
    };
  }
}
