'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="layout py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gradient mb-4 block">
              PetraX
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing oil trading with AI-powered insights and Web3 technology. 
              Trade smarter, faster, and more securely on the decentralized marketplace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/trading" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PetraX. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
