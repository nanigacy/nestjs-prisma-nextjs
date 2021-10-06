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

  // Customer
  async createCustomer(email: string): Promise<string | null> {
    const customer = await this.stripe.customers.create({
      email: email,
    });
    return customer?.id;
  }

  async updateCustomer(
    paymentMethodId: string,
    stripeCustomerId: string,
  ): Promise<any> {
    // デフォルトの決済方法を更新する
    const customer = await this.stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
    return customer;
  }

  // PaymentMethod
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

  // Plan
  // https://stripe.com/docs/api/plans/retrieve
  async retrievePlan(priceId: string): Promise<any> {
    console.log('✅ priceId:', priceId);

    const plan = await this.stripe.plans.retrieve(
      'price_1JgNMnDRHzepoHcJL2LT2Ryt',
    );

    console.log('✅ plan:', plan);
    return plan;
  }

  // Subscription
  // https://stripe.com/docs/api/subscriptions/create
  async createSubscription(
    priceId: string,
    stripeCustomerId: string,
  ): Promise<any> {
    const subscription = await this.stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
    });
    console.log('✅ subscription:', subscription);
    return subscription;
  }

  // https://stripe.com/docs/api/subscriptions/update
  async updateSubscription(
    stripeSubscriptionId: string,
    params: any,
  ): Promise<any> {
    const subscription = await this.stripe.subscriptions.update(
      stripeSubscriptionId,
      params,
    );
    console.log('✅ subscription:', subscription);
    return 'success';
  }

  // https://stripe.com/docs/api/subscriptions/cancel
  async cancelSubscription(subscriptionId: string): Promise<any> {
    const deleted = await this.stripe.subscriptions.del(subscriptionId);
    console.log('✅ deleted:', deleted);
    return deleted;
  }

  // https://stripe.com/docs/api/subscriptions/retrieve
  async retrieveSubscription(subscriptionId: string): Promise<any> {
    const subscription = await this.stripe.subscriptions.retrieve(
      subscriptionId,
    );
    console.log('✅ subscription:', subscription);
    return subscription;
  }
}
