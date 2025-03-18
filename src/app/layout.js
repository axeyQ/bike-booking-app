import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { ConvexClientProvider } from '@/lib/convex';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bike Booking App',
  description: 'Book your favorite bikes for rental',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
          <ToastContainer position="top-center" />
        </ConvexClientProvider>
      </body>
    </html>
  );
}