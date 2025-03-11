
import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Heart, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-12 bg-accent/50">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl mb-4">
            <QrCode className="h-6 w-6" />
            <span>QR Attendance System</span>
          </Link>
          <p className="text-muted-foreground">
            Simplify attendance tracking with our modern QR code-based system.
            Make attendance management effortless and accurate.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/generate-qr" className="text-muted-foreground hover:text-primary">
                Generate QR
              </Link>
            </li>
            <li>
              <Link to="/scan-qr" className="text-muted-foreground hover:text-primary">
                Scan QR
              </Link>
            </li>
            <li>
              <Link to="/reports" className="text-muted-foreground hover:text-primary">
                Reports
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Connect</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            Have questions or feedback? <br />
            <a href="mailto:contact@qrattendance.com" className="text-primary hover:underline">
              contact@qrattendance.com
            </a>
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} QR Attendance System. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
