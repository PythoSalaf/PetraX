'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm" style={{ borderColor: 'var(--border-muted)' }}>
      <div className="layout">
        <div className="flex items-center justify-center h-20">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-3 group">
            <div className="text-3xl font-bold text-gradient">PetraX</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
