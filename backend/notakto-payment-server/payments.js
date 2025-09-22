import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(cors());

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_SECRET = process.env.SHARED_KEY;
const COINBASE_API_URL = 'https://api.commerce.coinbase.com/charges';

console.log('Coinbase API Key:', COINBASE_API_KEY);

// API to create a payment charge
app.post('/create-payment', async (req, res) => {
    try {
        const { amount, currency, customerId, customerName } = req.body;

        const response = await axios.post(
            COINBASE_API_URL,
            {
                name: 'Test Payment',
                description: 'Testing crypto payments',
                pricing_type: 'fixed_price',
                local_price: { amount, currency },
                metadata: { customer_id: customerId, customer_name: customerName },
            },
            {
                headers: {
                    'X-CC-Api-Key': COINBASE_API_KEY,
                    'X-CC-Version': '2018-03-22',
                    'Content-Type': 'application/json',
                },
            }
        );

        const chargeId = response.data.data.id;
        const paymentUrl = response.data.data.hosted_url;

        res.json({ success: true, chargeId, paymentUrl });
    } catch (error) {
        console.error('Error creating payment:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || 'Payment creation failed' });
    }
});

// Webhook endpoint for Coinbase
app.post('/webhook/coinbase', (req, res) => {
    const signature = req.headers['x-cc-webhook-signature'];
    const payload = JSON.stringify(req.body);

    // Verify the signature
    const hmac = crypto.createHmac('sha256', COINBASE_SECRET);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');

    if (calculatedSignature !== signature) {
        return res.status(400).send('Invalid Signature');
    }

    const event = req.body.event;
    console.log('Coinbase Webhook Event:', event);

    if (event.type === 'charge:confirmed') {
        console.log('✅ Payment confirmed for:', event.data.code);
        // Update order status in database
    }

    res.status(200).send('Webhook Received');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
