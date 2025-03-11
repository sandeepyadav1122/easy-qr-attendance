
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, QrCode } from 'lucide-react';
import Motion from '@/components/ui/motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full bg-primary/5"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Hero content */}
          <Motion animation="fade-in" duration={800}>
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">
                Simple. Fast. Secure.
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Attendance Tracking 
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Reimagined</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                No more time-consuming roll calls. Create QR codes in seconds, let students scan, 
                and instantly track attendance with detailed analytics and reporting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="rounded-full group">
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full">
                  <Link to="/scan-qr">Scan QR Code</Link>
                </Button>
              </div>
              
              {/* Feature highlights */}
              <div className="pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  "Instant attendance tracking",
                  "Anti-cheating measures", 
                  "Detailed analytics",
                  "Export to PDF/Excel"
                ].map((feature, i) => (
                  <Motion key={i} animation="fade-in" delay={i * 100 + 500} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </Motion>
                ))}
              </div>
            </div>
          </Motion>

          {/* Hero image/illustration */}
          <Motion animation="fade-in" delay={300} duration={1000}>
            <div className="relative flex justify-center mx-auto">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-600/20 blur-xl"></div>
                <div className="glass relative overflow-hidden rounded-3xl border shadow-xl">
                  <div className="grid place-items-center h-[400px] w-full">
                    <div className="relative p-6 animate-qr-pulse">
                      <QrCode className="h-24 w-24 text-primary mx-auto" strokeWidth={1} />
                      <div className="mt-6 text-center">
                        <div className="font-semibold">Web Development 101</div>
                        <div className="text-sm text-muted-foreground">Room A113 • 9:00 AM</div>
                        <div className="mt-4 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Expires in 4:59
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </div>
  );
};

export default Hero;
