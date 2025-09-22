import Razorpay from "razorpay";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes } = body as {
      amount: number; // in paise
      currency?: string;
      receipt: string;
      notes?: Record<string, string>;
    };

    if (!amount || !receipt) {
      return new Response(JSON.stringify({ error: "amount and receipt are required" }), { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return new Response(JSON.stringify({ error: "Razorpay keys are not configured on the server" }), { status: 500 });
    }

    const razorpay = new Razorpay({ key_id, key_secret });

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });

    return new Response(JSON.stringify(order), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    console.error("Razorpay order error", err);
    const message = err?.error?.description || err?.message || "Failed to create order";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}