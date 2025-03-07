import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken'; // You'll need to install jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Demo authentication logic - replace with your actual auth
      if (email === 'studio@example.com' && password === 'password') {
        const token = sign({ email, role: 'studio' }, JWT_SECRET);
        res.status(200).json({
          token,
          email,
          role: 'studio'
        });
      } else if (email === 'guest@example.com' && password === 'password') {
        const token = sign({ email, role: 'guest' }, JWT_SECRET);
        res.status(200).json({
          token,
          email,
          role: 'guest'
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 