import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-6">
        <br/><br/><br/>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-3xl font-bold text-white">📸 PhotoWala</span>
            </div>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/about">
                  <span className="text-white hover:text-gray-200 transition">About</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <span className="text-white hover:text-gray-200 transition">Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <span className="bg-white text-purple-600 px-4 py-2 rounded-lg 
                    hover:bg-gray-100 transition">Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 