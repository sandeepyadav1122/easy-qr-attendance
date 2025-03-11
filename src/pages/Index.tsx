
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Motion from '@/components/ui/motion';

const testimonials = [
  {
    quote: "EasyQR has transformed our attendance process. We save so much time and have more accurate records than ever before.",
    author: "Sarah Johnson",
    role: "Computer Science Professor"
  },
  {
    quote: "As a student, I love not having to wait while the professor calls names. Just scan and I'm done!",
    author: "Michael Chen",
    role: "Engineering Student"
  },
  {
    quote: "The reporting features make it easy to identify attendance patterns and follow up with students who need support.",
    author: "David Wilson",
    role: "Department Chair"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary mb-4">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Our attendance system is designed to be intuitive and easy to use for both teachers and students.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Teacher Creates Session",
                  description: "Teacher generates a unique QR code for the class session with just a few clicks.",
                  number: "01"
                },
                {
                  title: "Students Scan Code",
                  description: "Students scan the displayed QR code with their phones to mark their attendance.",
                  number: "02"
                },
                {
                  title: "Attendance Recorded",
                  description: "System instantly records attendance and provides real-time updates and reports.",
                  number: "03"
                }
              ].map((step, index) => (
                <Motion 
                  key={index}
                  animation="fade-in"
                  delay={index * 200}
                >
                  <Card className="glass border relative p-6 h-full">
                    <div className="absolute -top-4 -right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                </Motion>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary mb-4">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                What Our Users Say
              </h2>
              <p className="text-muted-foreground">
                Don't just take our word for it. Here's what educators and students think about our QR attendance system.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Motion 
                  key={index}
                  animation="fade-in"
                  delay={index * 200}
                >
                  <Card className="glass border p-6 h-full">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xl">★</span>
                      ))}
                    </div>
                    <p className="italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                </Motion>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Motion animation="fade-in">
              <Card className="glass border overflow-hidden">
                <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Ready to simplify attendance tracking?</h2>
                    <p className="text-muted-foreground mb-6">
                      Join educators worldwide who are saving time and improving accuracy with our QR-based attendance system.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Check className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                        <span>No more time-consuming roll calls</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                        <span>Accurate, tamper-proof attendance records</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                        <span>Detailed analytics and exportable reports</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button size="lg" asChild className="rounded-full group">
                        <Link to="/dashboard">
                          Get Started Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl blur-xl"></div>
                    <div className="relative glass rounded-2xl p-6 flex flex-col items-center">
                      <div className="rounded-full bg-blue-100 p-4 mb-4">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                          500+
                        </p>
                        <p className="text-muted-foreground">Schools & Universities</p>
                      </div>
                      <div className="w-full border-t border-border my-6"></div>
                      <div className="text-center">
                        <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                          50,000+
                        </p>
                        <p className="text-muted-foreground">Classes Tracked Monthly</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Motion>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
