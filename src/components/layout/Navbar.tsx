
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, QrCode, UserCheck, ChartBar, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Dashboard', href: '/dashboard', icon: null },
    { name: 'Generate QR', href: '/generate-qr', icon: <QrCode className="h-4 w-4 mr-1" /> },
    { name: 'Scan QR', href: '/scan-qr', icon: <UserCheck className="h-4 w-4 mr-1" /> },
    { name: 'Reports', href: '/reports', icon: <ChartBar className="h-4 w-4 mr-1" /> },
    { name: 'Profile', href: '/profile', icon: <User className="h-4 w-4 mr-1" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-bold text-xl"
          >
            <QrCode className="h-6 w-6" />
            <span className="hidden sm:inline-block">EasyQR Attendance</span>
            <span className="sm:hidden">EasyQR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center',
                  isActive(item.href)
                    ? 'text-primary bg-accent'
                    : 'text-foreground/80 hover:text-primary hover:bg-accent/50'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden bg-transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium flex items-center',
                  isActive(item.href)
                    ? 'text-primary bg-accent'
                    : 'text-foreground/80 hover:text-primary hover:bg-accent/50'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-border">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
