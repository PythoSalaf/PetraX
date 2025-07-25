'use client';

import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX, IconHome, IconShoppingCart, IconTrendingUp, IconWallet } from '@tabler/icons-react';
import { useWallet } from '@/contexts';
import { cn } from '@/lib/utils';

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        'h-full fixed left-0 top-20 px-4 py-4 hidden md:flex md:flex-col bg-white/95 backdrop-blur-sm border-r shadow-sm z-40 w-[300px] shrink-0',
        className
      )}
      style={{ borderColor: 'var(--border-muted)' }}
      animate={{
        width: animate ? (open ? '300px' : '60px') : '300px',
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-start bg-transparent w-full fixed top-20 left-0 z-40',
          className
        )}
        {...props}
      >
        <div className="flex justify-start z-50 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed h-full w-full inset-0 bg-white/95 backdrop-blur-sm p-10 z-[100] flex flex-col justify-start',
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              <div className="mt-16">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export const SidebarLink = ({ href, label, icon, className }: SidebarLinkProps) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-start gap-3 group/sidebar py-3 px-2 rounded-xl transition-all duration-200',
        isActive 
          ? 'text-white shadow-lg' 
          : 'text-gray-600 hover:text-white hover:shadow-md',
        className
      )}
      style={{
        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
        color: isActive ? 'white' : 'var(--text-secondary)'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          e.currentTarget.style.color = 'white';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }
      }}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-medium"
      >
        {label}
      </motion.span>
    </Link>
  );
};

export const SidebarWalletButton = () => {
  const { wallet, connect, disconnect } = useWallet();
  const { open, animate } = useSidebar();

  const handleWalletAction = async () => {
    if (wallet.isConnected) {
      await disconnect();
    } else {
      try {
        await connect('internet-identity');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const getWalletButtonText = () => {
    if (wallet.isConnecting) return 'Connecting...';
    if (wallet.isConnected && wallet.accountId) {
      return wallet.accountId.slice(0, 8) + '...';
    }
    return 'Connect Wallet';
  };

  return (
    <button
      onClick={handleWalletAction}
      disabled={wallet.isConnecting}
      className={cn(
        'flex items-center justify-start gap-3 w-full py-3 px-2 rounded-xl transition-all duration-200 mt-4',
        wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
      )}
      style={{
        backgroundColor: wallet.isConnected ? 'var(--color-success-light)' : 'var(--background-tertiary)',
        color: wallet.isConnected ? 'var(--color-success)' : 'var(--text-secondary)'
      }}
    >
      <div className="flex-shrink-0">
        <IconWallet className="h-5 w-5" />
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm font-medium whitespace-pre inline-block !p-0 !m-0"
      >
        {getWalletButtonText()}
      </motion.span>
      {wallet.isConnected && (
        <motion.div
          animate={{
            display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="w-2 h-2 rounded-full ml-auto"
          style={{ backgroundColor: 'var(--color-success)' }}
        />
      )}
    </button>
  );
};

// Navigation items
export const navigationItems = [
  { href: '/home', label: 'Home', icon: <IconHome className="h-5 w-5" /> },
  { href: '/marketplace', label: 'Marketplace', icon: <IconShoppingCart className="h-5 w-5" /> },
  { href: '/trading', label: 'Trading', icon: <IconTrendingUp className="h-5 w-5" /> },
];
