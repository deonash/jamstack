import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Return the user data
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
} 