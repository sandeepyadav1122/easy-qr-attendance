
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, MailOpen, Phone, Building, Settings, Shield, FileText, LogOut } from 'lucide-react';
import Motion from '@/components/ui/motion';
import { Avatar } from '@/components/ui/avatar';

const Profile = () => {
  // Demo user data
  const user = {
    name: 'John Smith',
    email: 'john.smith@university.edu',
    role: 'Professor',
    department: 'Computer Science',
    phone: '+1 (555) 123-4567',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <Motion animation="fade-in" delay={100} className="md:col-span-1">
              <Card className="glass border">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <img src={user.profilePicture} alt={user.name} />
                    </Avatar>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.role}</p>
                    <p className="text-muted-foreground text-sm">{user.department}</p>
                    
                    <div className="w-full space-y-3 mt-6">
                      <div className="flex items-center text-sm">
                        <MailOpen className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{user.department}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-6 w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Motion>
            
            {/* Settings and Other Info */}
            <Motion animation="fade-in" delay={200} className="md:col-span-2">
              <Card className="glass border mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Update your account information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Personal Information', description: 'Update your name, email, and profile picture', icon: User },
                      { title: 'Security', description: 'Manage your password and account security', icon: Shield },
                      { title: 'Notification Preferences', description: 'Configure how you receive notifications', icon: MailOpen },
                      { title: 'Privacy Settings', description: 'Control who can see your information', icon: FileText },
                    ].map((item, i) => (
                      <div key={i} className="flex p-4 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Motion animation="fade-in" delay={300}>
                  <Card className="glass border">
                    <CardHeader>
                      <CardTitle className="text-lg">Attendance Overview</CardTitle>
                      <CardDescription>Your overall attendance statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Classes Conducted</span>
                          <span className="font-medium">42</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Students</span>
                          <span className="font-medium">156</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average Attendance</span>
                          <span className="font-medium">92%</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View Detailed Reports
                      </Button>
                    </CardContent>
                  </Card>
                </Motion>
                
                <Motion animation="fade-in" delay={400}>
                  <Card className="glass border">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                      <CardDescription>Commonly used features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        View My Schedule
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Attendance Reports
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure QR Settings
                      </Button>
                    </CardContent>
                  </Card>
                </Motion>
              </div>
            </Motion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
