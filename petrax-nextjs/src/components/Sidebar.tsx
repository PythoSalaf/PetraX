'use client';

import React, { useState, createContext, useContext } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts';
import { truncateAddress } from '@/utils';

// Types and interfaces
interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

// Context for sidebar state management
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Sidebar Provider component
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
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar component
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

// Sidebar Body component that renders both desktop and mobile versions
export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

// Desktop Sidebar component with hover-to-expand functionality
export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full fixed px-4 py-4 hidden shadow-sm z-40 md:flex md:flex-col bg-white/95 backdrop-blur-sm w-[300px] shrink-0 border-r",
          className,
        )}
        style={{ borderColor: 'var(--border-muted)' }}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

// Mobile Sidebar component with slide-in animation
export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-transparent w-full fixed z-50",
        )}
        {...props}
      >
        <div className="flex justify-start w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className,
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Sidebar Link component with animations and active state
export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          isActive ? "text-primary" : "text-neutral-700 dark:text-neutral-200",
        )}
      >
        {link.icon}
      </div>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
          isActive
            ? "text-primary font-medium"
            : "text-neutral-700 dark:text-neutral-200",
        )}
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

// Wallet Button component for the sidebar
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

  const getWalletButtonText = (): string => {
    if (wallet.isConnecting) return 'Connecting...';
    if (wallet.isConnected && wallet.accountId) {
      return truncateAddress(wallet.accountId);
    }
    return 'Connect Wallet';
  };

  return (
    <motion.button
      onClick={handleWalletAction}
      disabled={wallet.isConnecting}
      className={cn(
        "w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg",
        wallet.isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
      )}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white'
      }}
      animate={{
        width: animate ? (open ? "100%" : "40px") : "100%",
      }}
    >
      {wallet.isConnecting && (
        <div className="loading-spinner mr-2 inline-block"></div>
      )}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
      >
        {getWalletButtonText()}
      </motion.span>
    </motion.button>
  );
};

// Default export for backward compatibility
const SidebarComponent = Sidebar;
export default SidebarComponent;
