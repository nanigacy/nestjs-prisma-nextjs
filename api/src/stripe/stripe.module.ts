import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Module({
  imports: [],
  controllers: [],
  providers: [StripeService],
  exports: [],
})
export class StripeModule {}
