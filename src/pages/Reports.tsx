
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  FileDown, 
  Filter, 
  CalendarDays, 
  UserCheck, 
  UserX, 
  Users, 
  ClipboardList
} from 'lucide-react';
import Motion from '@/components/ui/motion';
import { formatDate } from '@/lib/utils';

const Reports = () => {
  // Demo attendance data
  const attendanceData = [
    { id: '1', name: 'Web Development 101', date: new Date('2023-05-15'), present: 28, total: 30, percentage: 93.3 },
    { id: '2', name: 'Database Systems', date: new Date('2023-05-16'), present: 23, total: 25, percentage: 92 },
    { id: '3', name: 'UI/UX Design Principles', date: new Date('2023-05-17'), present: 18, total: 22, percentage: 81.8 },
    { id: '4', name: 'Algorithms & Data Structures', date: new Date('2023-05-18'), present: 31, total: 35, percentage: 88.6 },
    { id: '5', name: 'Mobile App Development', date: new Date('2023-05-19'), present: 27, total: 28, percentage: 96.4 },
  ];
  
  const [selectedReport, setSelectedReport] = useState('recent');
  
  // Filter buttons for different report types
  const reportTypes = [
    { id: 'recent', label: 'Recent', icon: ClipboardList },
    { id: 'daily', label: 'Daily', icon: CalendarDays },
    { id: 'weekly', label: 'Weekly', icon: BarChart3 },
    { id: 'monthly', label: 'Monthly', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Attendance Reports</h1>
              <p className="text-muted-foreground">View and analyze attendance data</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Report Type Selector */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {reportTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedReport === type.id ? 'default' : 'outline'}
                  className="flex items-center"
                  onClick={() => setSelectedReport(type.id)}
                >
                  <type.icon className="h-4 w-4 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Stats Cards */}
          <Motion animation="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Total Classes', value: '24', icon: ClipboardList, color: 'bg-blue-100 text-blue-600' },
                { title: 'Average Attendance', value: '91%', icon: UserCheck, color: 'bg-green-100 text-green-600' },
                { title: 'Absent Students', value: '9%', icon: UserX, color: 'bg-red-100 text-red-600' },
              ].map((stat, index) => (
                <Card key={index} className="glass border">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`rounded-full p-3 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Motion>
          
          {/* Main Report Table */}
          <Motion animation="fade-in" delay={200}>
            <Card className="glass border mb-8">
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Overview of recent class attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Class Name</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Present</th>
                        <th className="py-3 px-4 text-left font-medium">Total</th>
                        <th className="py-3 px-4 text-left font-medium">Percentage</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record) => (
                        <tr key={record.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{record.name}</td>
                          <td className="py-3 px-4">{formatDate(record.date)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                              {record.present}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-blue-500" />
                              {record.total}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                              record.percentage >= 90 
                                ? 'bg-green-100 text-green-800' 
                                : record.percentage >= 75 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {record.percentage.toFixed(1)}%
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="h-8">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </Motion>
          
          {/* Attendance Trends Chart Placeholder */}
          <Motion animation="fade-in" delay={300}>
            <Card className="glass border">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Weekly attendance patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/60" />
                    <p className="mt-2 text-muted-foreground">Attendance trend chart will be displayed here</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Motion>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;
