import { Request, Response } from 'express';
import stripePackage, {Stripe} from 'stripe';
import orderModel from "../model/order.model";

const apiKey = 'sk_test_51MlH77ETTslAJbYeTNVwNvK8cufQdrujE0lN7AfHZrYDQ4AUGHgSIIEMVmZI8AgB75GpxzESH80SgJ86CIB1RtUC00nZJcczV6';

// Define your Stripe configuration options
const stripeConfig: stripePackage.StripeConfig = {
  apiVersion: '2022-11-15',
  maxNetworkRetries: 2,
};

// Create a new Stripe object with the configuration options
const stripe: Stripe = new stripePackage(apiKey, stripeConfig);

export const createPaymentIntent = async (req: Request, res: Response) => {
  const {order_id } = req.body;
  const findOrder: any = await orderModel.findById(order_id).populate("product_id", "price");

  if (!findOrder) throw new Error("Buyurtma berilgan mahsulot topilmadi!");

  const amount = findOrder.product_id.price;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
