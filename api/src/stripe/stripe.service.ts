import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(email: string): Promise<string | null> {
    const customer = await this.stripe.customers.create({
      email: email,
    });
    return customer?.id;
  }

  async attachPaymentMethod(
    paymentMethodId: string,
    stripeCustomerId: string,
  ): Promise<any> {
    console.log('✅ paymentMethodId:', paymentMethodId);
    console.log('✅ stripeCustomerId:', stripeCustomerId);

    const paymentMethod = await this.stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: stripeCustomerId },
    );

    console.log('✅ paymentMethod:', paymentMethod);
    return paymentMethod;
  }
}
