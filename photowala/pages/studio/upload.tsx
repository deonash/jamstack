import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StudioUpload() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'studio') {
      router.replace('/login');
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-white">📸 PhotoWala Studio</span>
            <div className="flex items-center space-x-4">
              <span className="text-white">{user?.email}</span>
              <button
                onClick={logout}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg 
                  hover:bg-gray-100 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Studio Photo Upload</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-12 text-center">
            <input
              type="file"
              multiple
              className="hidden"
              id="photo-upload"
              accept="image/*"
            />
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 mb-2">Drag and drop photos here</p>
              <p className="text-sm text-gray-500">or click to select files</p>
            </label>
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white 
                py-2 rounded-lg hover:opacity-90 transition duration-300"
            >
              Upload Photos
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 