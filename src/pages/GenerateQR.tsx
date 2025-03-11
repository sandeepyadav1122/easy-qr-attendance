
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { QrCode, Copy, Download, Clock, CalendarClock, Users, Share2 } from 'lucide-react';
import Motion from '@/components/ui/motion';
import { useSearchParams } from 'react-router-dom';
import { generateId, generateQRPlaceholder } from '@/lib/utils';

const GenerateQR = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('class');
  
  const [className, setClassName] = useState('');
  const [room, setRoom] = useState('');
  const [duration, setDuration] = useState('5');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [sessionCode, setSessionCode] = useState<string>('');
  const [attendees, setAttendees] = useState<string[]>([]);
  
  // Prefill form if class ID is provided
  useEffect(() => {
    if (classId) {
      // In a real app, you would fetch the class details from an API
      // For demo purposes, we'll use hardcoded data
      const classData = {
        '1': { name: 'Web Development 101', room: 'A113' },
        '2': { name: 'Database Systems', room: 'B201' },
        '3': { name: 'UI/UX Design Principles', room: 'C305' },
      }[classId];
      
      if (classData) {
        setClassName(classData.name);
        setRoom(classData.room);
      }
    }
  }, [classId]);
  
  // Generate QR code for demonstration
  const generateQR = () => {
    if (!className) {
      toast.error('Please enter a class name');
      return;
    }
    
    if (!room) {
      toast.error('Please enter a room number');
      return;
    }
    
    // Generate a session code
    const code = generateId(6).toUpperCase();
    setSessionCode(code);
    
    // Set QR code data (would normally be an API call to generate)
    setQrCodeData(generateQRPlaceholder());
    
    // Set expiry time
    const expiry = Date.now() + parseInt(duration) * 60 * 1000;
    setExpiryTime(expiry);
    
    // Reset attendees
    setAttendees([]);
    
    // Show the generated QR
    setQrGenerated(true);
    
    toast.success('QR code generated successfully!');
  };
  
  // Update timer
  useEffect(() => {
    if (!expiryTime) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expiryTime - now;
      
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
        return;
      }
      
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      
      // Simulate students signing in
      if (Math.random() > 0.9 && attendees.length < 30) {
        const newAttendee = `Student ${Math.floor(Math.random() * 100) + 1}`;
        if (!attendees.includes(newAttendee)) {
          setAttendees(prev => [...prev, newAttendee]);
          toast(`${newAttendee} checked in`, {
            duration: 2000,
          });
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiryTime, attendees]);
  
  // Copy session code to clipboard
  const copySessionCode = () => {
    navigator.clipboard.writeText(sessionCode);
    toast.success('Session code copied to clipboard');
  };
  
  // Download QR code (simulated)
  const downloadQR = () => {
    toast.success('QR code downloaded');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <Motion animation="fade-in">
            <h1 className="text-3xl font-bold mb-6">Generate Attendance QR Code</h1>
          </Motion>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Generator Form */}
            <Motion animation="fade-in" delay={100}>
              <Card className="glass border p-6">
                {!qrGenerated ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="className">Class Name</Label>
                      <Input 
                        id="className" 
                        placeholder="e.g. Web Development 101" 
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="room">Room Number/Location</Label>
                      <Input 
                        id="room" 
                        placeholder="e.g. A113" 
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">QR Code Expiry Time</Label>
                      <Select defaultValue={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 Minutes</SelectItem>
                          <SelectItem value="5">5 Minutes</SelectItem>
                          <SelectItem value="10">10 Minutes</SelectItem>
                          <SelectItem value="15">15 Minutes</SelectItem>
                          <SelectItem value="30">30 Minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        The QR code will expire after this time period.
                      </p>
                    </div>
                    
                    <Button onClick={generateQR} className="w-full">
                      Generate QR Code
                      <QrCode className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{className}</h2>
                      <p className="text-muted-foreground">Room: {room}</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="animate-qr-pulse">
                          {qrCodeData && (
                            <img 
                              src={qrCodeData} 
                              alt="QR Code" 
                              className="w-64 h-64 mx-auto border border-border rounded-md" 
                            />
                          )}
                        </div>
                        
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{timeLeft}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Session Code:</p>
                        <p className="text-lg font-mono font-bold">{sessionCode}</p>
                      </div>
                      <Button variant="outline" size="icon" onClick={copySessionCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1" onClick={downloadQR}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setQrGenerated(false)}
                    >
                      Create New Session
                    </Button>
                  </div>
                )}
              </Card>
            </Motion>
            
            {/* Attendance Status */}
            <Motion animation="fade-in" delay={200}>
              <Card className="glass border p-6 h-full">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Attendance Status</h2>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{attendees.length} present</span>
                    </div>
                  </div>
                  
                  {qrGenerated ? (
                    <>
                      <div className="relative flex-grow mb-4 min-h-52">
                        {attendees.length > 0 ? (
                          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {attendees.map((student, index) => (
                              <Motion
                                key={index}
                                animation="fade-in"
                                delay={index * 50}
                                className="flex items-center justify-between bg-accent/30 p-3 rounded-md"
                              >
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary grid place-items-center mr-3">
                                    {student.charAt(0)}
                                  </div>
                                  <span>{student}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  Just now
                                </span>
                              </Motion>
                            ))}
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground">
                            <Users className="h-12 w-12 mb-3 opacity-20" />
                            <p>No students have scanned the QR code yet.</p>
                            <p className="text-sm mt-2">
                              Attendance will appear here in real-time as students scan.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-border">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Session Progress</span>
                          <span>
                            {expiryTime && 
                              `${Math.min(
                                100,
                                Math.round(
                                  ((parseInt(duration) * 60 * 1000) - 
                                  (expiryTime - Date.now())) / 
                                  (parseInt(duration) * 60 * 1000) * 100
                                )
                              )}%`
                            }
                          </span>
                        </div>
                        <div className="bg-muted/50 h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: expiryTime
                                ? `${Math.min(
                                    100,
                                    ((parseInt(duration) * 60 * 1000) - 
                                    (expiryTime - Date.now())) / 
                                    (parseInt(duration) * 60 * 1000) * 100
                                  )}%`
                                : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
                      <CalendarClock className="h-16 w-16 mb-4 opacity-20" />
                      <h3 className="text-lg font-medium mb-2">No Active Session</h3>
                      <p className="max-w-md">
                        Generate a QR code to start a new attendance session.
                        Student attendance will appear here in real-time.
                      </p>
                    </div>
                  )}
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

export default GenerateQR;
