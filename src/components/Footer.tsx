"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold text-blue-600 mb-4">MediStore 💊</h3>
          <p className="text-gray-500 text-sm">Your Trusted Online Medicine Shop. Providing genuine healthcare essentials to your doorstep.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="text-gray-500 space-y-2 text-sm">
            <li><Link href="/shop">Browse Medicines</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-gray-500 text-sm">Email: support@medistore.com</p>
          <p className="text-gray-500 text-sm">Phone: +880 1234 567890</p>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400 text-xs">
        © 2026 MediStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;