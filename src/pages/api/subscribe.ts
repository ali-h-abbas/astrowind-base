import { NextApiRequest, NextApiResponse } from 'next';

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    const apiKey = process.env.CONVERTKIT_API_KEY;

    const response = await fetch(`https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: apiKey,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}