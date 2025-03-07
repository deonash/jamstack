import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function GuestSelfie() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'guest') {
      router.replace('/login');
    }
  }, [isAuthenticated, user]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera');
    }
  };

  const takeSelfie = () => {
    if (!videoRef.current || !isStreaming) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

    // Here you would typically send the image data to your server
    const imageData = canvas.toDataURL('image/jpeg');
    // Handle the image data (e.g., upload to server)
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Take Your Selfie</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-lg w-full"
            />
          </div>

          <div className="flex justify-center space-x-4">
            {!isStreaming ? (
              <button
                onClick={startCamera}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white 
                  px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
              >
                Start Camera
              </button>
            ) : (
              <button
                onClick={takeSelfie}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white 
                  px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
              >
                Take Selfie
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 