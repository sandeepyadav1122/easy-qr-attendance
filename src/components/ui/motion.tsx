
import React from 'react';
import { cn } from '@/lib/utils';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | 'fade-in'
    | 'fade-out'
    | 'slide-in-right'
    | 'slide-out-right'
    | 'slide-in-up'
    | 'slide-out-up'
    | 'slide-in-down'
    | 'slide-out-down'
    | 'qr-pulse';
  delay?: number; // in ms
  duration?: number; // in ms
  once?: boolean;
}

export const Motion = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  duration = 300,
  once = true,
}: MotionProps) => {
  const [isVisible, setIsVisible] = React.useState(!once);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (once) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.disconnect();
        }
      };
    }
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation}` : 'opacity-0',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Motion;
