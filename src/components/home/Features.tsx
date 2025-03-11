
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Shield, BarChart3, FileSpreadsheet, Clock, Users, CalendarClock, QrCode } from 'lucide-react';
import Motion from '@/components/ui/motion';

const features = [
  {
    title: "Quick QR Generation",
    description: "Create unique QR codes for each class session in seconds. Students scan to instantly mark attendance.",
    icon: QrCode,
  },
  {
    title: "Anti-Cheating Measures",
    description: "QR codes expire after a short time, and students must be physically present in the classroom to scan.",
    icon: Shield,
  },
  {
    title: "Detailed Analytics",
    description: "Access comprehensive attendance data with visual charts and insights to track attendance patterns.",
    icon: BarChart3,
  },
  {
    title: "Export Options",
    description: "Download attendance records as Excel or PDF files for easy record-keeping and reporting.",
    icon: FileSpreadsheet,
  },
  {
    title: "Schedule Classes",
    description: "Set up recurring classes with automatic QR generation for seamless attendance tracking.",
    icon: CalendarClock,
  },
  {
    title: "User Management",
    description: "Efficiently manage teachers, students, and administrators with role-based access controls.",
    icon: Users,
  },
  {
    title: "Real-Time Updates",
    description: "See who's present in real-time as students scan the attendance QR code.",
    icon: Clock,
  },
  {
    title: "Attendance History",
    description: "Students can check their attendance history and statistics for all their classes.",
    icon: CheckCircle,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary mb-4">
            Why Choose EasyQR?
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Features designed for modern attendance tracking
          </h2>
          <p className="text-muted-foreground">
            Our QR-based attendance system combines simplicity with powerful features to make tracking attendance 
            effortless for teachers and students alike.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Motion 
              key={index} 
              animation="fade-in" 
              delay={index * 100}
              className="h-full"
            >
              <Card className="h-full glass border p-6 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
