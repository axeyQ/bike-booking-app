import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Bike Booking
          </Link>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/bikes">Bikes</Link></li>
                <li><Link href="/bookings">My Bookings</Link></li>
              </ul>
            </nav>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-blue-600 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Bike Booking
        </div>
      </footer>
    </div>
  );
}