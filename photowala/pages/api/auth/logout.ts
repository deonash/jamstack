import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the auth cookie
    res.setHeader('Set-Cookie', [
      'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ]);
    
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 