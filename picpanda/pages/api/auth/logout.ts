import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Clear cookies
  res.setHeader('Set-Cookie', [
    'auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
    'user_role=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
  ]);

  return res.status(200).json({ success: true });
} 