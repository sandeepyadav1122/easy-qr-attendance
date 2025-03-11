
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  QrCode, 
  CalendarCheck, 
  Calendar, 
  BarChart3, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Motion from '@/components/ui/motion';
import { formatDate, formatTime } from '@/lib/utils';

const Dashboard = () => {
  // Demo data
  const todayClasses = [
    { id: '1', name: 'Web Development 101', time: new Date('2023-05-20T09:00:00'), room: 'A113', present: 24, total: 30 },
    { id: '2', name: 'Database Systems', time: new Date('2023-05-20T13:00:00'), room: 'B201', present: 18, total: 25 },
    { id: '3', name: 'UI/UX Design Principles', time: new Date('2023-05-20T15:30:00'), room: 'C305', present: 0, total: 22 },
  ];
  
  const recentAttendance = [
    { id: '1', name: 'Mobile App Development', date: new Date('2023-05-19T10:00:00'), present: 27, total: 28 },
    { id: '2', name: 'Algorithms & Data Structures', date: new Date('2023-05-18T14:00:00'), present: 31, total: 35 },
    { id: '3', name: 'Cloud Computing', date: new Date('2023-05-17T09:00:00'), present: 19, total: 20 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your attendance system.</p>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: 'Total Students', value: '127', icon: Users, color: 'bg-blue-100 text-blue-600' },
              { title: 'Classes Today', value: '4', icon: Calendar, color: 'bg-green-100 text-green-600' },
              { title: 'Attendance Rate', value: '92%', icon: CheckCircle2, color: 'bg-purple-100 text-purple-600' },
              { title: 'Total Classes', value: '24', icon: CalendarCheck, color: 'bg-amber-100 text-amber-600' },
            ].map((stat, index) => (
              <Motion key={index} animation="fade-in" delay={index * 100}>
                <Card className="glass border p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`rounded-full p-3 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              </Motion>
            ))}
          </div>
          
          {/* Today's Classes */}
          <Motion animation="fade-in" delay={400}>
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Today's Classes</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/generate-qr">Create Class Session</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {todayClasses.map((cls) => (
                  <Card key={cls.id} className="glass border overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{cls.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTime(cls.time)}</span>
                            <span className="mx-2">•</span>
                            <span>Room {cls.room}</span>
                          </div>
                        </div>
                        {new Date() < cls.time ? (
                          <div className="bg-amber-100 text-amber-600 text-xs px-2 py-1 rounded-full">
                            Upcoming
                          </div>
                        ) : cls.present > 0 ? (
                          <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            In Progress
                          </div>
                        ) : (
                          <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                            Not Started
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-muted/50 h-2 rounded-full mb-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(cls.present / cls.total) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>{cls.present} present</span>
                        <span>{cls.total} total</span>
                      </div>
                      
                      <div className="mt-6">
                        {new Date() < cls.time ? (
                          <Button className="w-full" asChild>
                            <Link to={`/generate-qr?class=${cls.id}`}>
                              Generate QR
                              <QrCode className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        ) : cls.present > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" asChild>
                              <Link to={`/generate-qr?class=${cls.id}`}>
                                View QR
                              </Link>
                            </Button>
                            <Button variant="default" asChild>
                              <Link to={`/reports?class=${cls.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <Button className="w-full" asChild>
                            <Link to={`/generate-qr?class=${cls.id}`}>
                              Start Session
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Motion>
          
          {/* Recent Attendance & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Attendance */}
            <Motion animation="fade-in" delay={600} className="lg:col-span-2">
              <Card className="glass border h-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Attendance</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/reports">
                        View All
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentAttendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-md transition-colors">
                        <div>
                          <h3 className="font-medium">{record.name}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(record.date)}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="font-medium">{Math.round((record.present / record.total) * 100)}%</p>
                            <p className="text-xs text-muted-foreground">{record.present}/{record.total} students</p>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/reports?class=${record.id}`}>
                              <BarChart3 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Motion>
            
            {/* Quick Actions */}
            <Motion animation="fade-in" delay={700}>
              <Card className="glass border h-full">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Generate QR Code', icon: QrCode, href: '/generate-qr', color: 'text-primary' },
                      { label: 'Scan Attendance QR', icon: CheckCircle2, href: '/scan-qr', color: 'text-green-600' },
                      { label: 'View Attendance Reports', icon: BarChart3, href: '/reports', color: 'text-purple-600' },
                      { label: 'Manage Schedule', icon: Calendar, href: '/profile', color: 'text-amber-600' },
                    ].map((action, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        className="w-full justify-start h-auto py-3"
                        asChild
                      >
                        <Link to={action.href}>
                          <div className={`rounded-full p-2 bg-accent mr-3 ${action.color}`}>
                            <action.icon className="h-5 w-5" />
                          </div>
                          {action.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </Motion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
