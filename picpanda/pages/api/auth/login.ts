import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Hardcoded users for testing
    const USERS = {
      'studio@example.com': { role: 'studio', password: 'password123' },
      'guest@example.com': { role: 'guest', password: 'password123' },
      'admin@example.com': { role: 'admin', password: 'password123' }
    };

    const user = USERS[email as keyof typeof USERS];
    
    // Debug log
    console.log('Login attempt:', { email, providedPassword: password, foundUser: user });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign({ email, role: user.role }, 'your-secret-key');

    // Set cookies
    res.setHeader('Set-Cookie', [
      `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      `user_role=${user.role}; Path=/; HttpOnly; Secure; SameSite=Strict`
    ]);

    return res.status(200).json({ 
      success: true,
      user: { email, role: user.role }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}