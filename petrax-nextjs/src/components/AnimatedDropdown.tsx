'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';

// Floating particles component for extra delight
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100%',
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: '-20%',
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: `${Math.random() * 100}%`
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: particle * 0.5,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface AnimatedDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [justSelected, setJustSelected] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          setFocusedIndex(-1);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        }
        break;
    }
  };

  const createRipple = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleOptionClick = (optionValue: string, event?: React.MouseEvent) => {
    if (event) createRipple(event);
    onChange(optionValue);
    setJustSelected(true);
    setIsOpen(false);
    setFocusedIndex(-1);

    // Reset the selection animation
    setTimeout(() => setJustSelected(false), 500);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <motion.label
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
          animate={isOpen ? { color: '#3b82f6' } : { color: 'var(--text-secondary)' }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      
      <motion.div
        className={`
          relative w-full cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        whileTap={disabled ? {} : { scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <motion.button
          type="button"
          className={`
            relative w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl
            transition-all duration-300 ease-out overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10
            ${isOpen ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-50/50 to-transparent' : ''}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={(e) => {
            if (!disabled) {
              createRipple(e);
              setIsOpen(!isOpen);
            }
          }}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${label}-label` : undefined}
          disabled={disabled}
          whileHover={disabled ? {} : { y: -1, scale: 1.01 }}
          whileFocus={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute bg-blue-400/30 rounded-full pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}

          {/* Subtle shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isOpen ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transform: 'skewX(-20deg)' }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedOption?.icon && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: justSelected ? [1, 1.2, 1] : 1,
                    opacity: 1,
                    rotate: justSelected ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: justSelected ? 0.5 : 0.2 }}
                  className="flex-shrink-0"
                >
                  {selectedOption.icon}
                </motion.div>
              )}
              <motion.span
                className={`font-medium ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}
                animate={justSelected ? {
                  scale: [1, 1.05, 1],
                  color: ['#111827', '#3b82f6', '#111827']
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </motion.span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <IconChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95, rotateX: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                boxShadow: [
                  '0 10px 25px rgba(0,0,0,0.1)',
                  '0 15px 35px rgba(0,0,0,0.15)',
                  '0 10px 25px rgba(0,0,0,0.1)'
                ]
              }}
              exit={{ opacity: 0, y: -4, scale: 0.98, rotateX: -5 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.2 },
                boxShadow: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
              }}
              className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl overflow-hidden"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
              }}
            >
              {/* Floating particles for extra delight */}
              <FloatingParticles />

              <div className="max-h-60 overflow-y-auto py-1 relative z-10">
                {options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    ref={el => {
                      if (el) optionsRef.current[index] = el;
                    }}
                    className={`
                      relative px-4 py-3 cursor-pointer transition-all duration-200 overflow-hidden
                      flex items-center justify-between gap-3
                      ${focusedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
                      ${option.value === value ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                    `}
                    onClick={(e) => handleOptionClick(option.value, e)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    whileHover={{
                      x: 6,
                      backgroundColor: option.value === value ? '#3b82f6' : '#f8fafc',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="flex items-center gap-3">
                      {option.icon && (
                        <div className="flex-shrink-0">
                          {option.icon}
                        </div>
                      )}
                      <span className="font-medium">{option.label}</span>
                    </div>
                    {option.value === value && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconCheck className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AnimatedDropdown;
