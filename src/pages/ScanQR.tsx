
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Camera, Check, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import Motion from '@/components/ui/motion';

const ScanQR = () => {
  const [scanTab, setScanTab] = useState<string>('camera');
  const [sessionCode, setSessionCode] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [sessionDetails, setSessionDetails] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanButtonRef = useRef<HTMLButtonElement>(null);
  
  // Simulates camera scanning
  const startScanning = async () => {
    setScanning(true);
    setSuccess(null);
    setScanned(false);
    
    try {
      // Get camera access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        // Simulate QR code scanning after 3 seconds
        setTimeout(() => {
          processQRCode();
        }, 3000);
      } else {
        toast.error('Camera access is not supported in this browser');
        setScanning(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera. Please check permissions.');
      setScanning(false);
    }
  };
  
  // Simulate QR code processing
  const processQRCode = () => {
    setScanned(true);
    setScanning(false);
    
    // Simulate a 50/50 chance of success or failure
    const isSuccessful = Math.random() > 0.3;
    
    // Simulate processing delay
    setTimeout(() => {
      if (isSuccessful) {
        // Success case
        setSuccess(true);
        setSessionDetails({
          className: 'Web Development 101',
          instructor: 'Dr. John Smith',
          room: 'A113',
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        });
        toast.success('Attendance recorded successfully!');
      } else {
        // Failure case
        setSuccess(false);
        toast.error('QR code has expired. Please ask for a new one.');
      }
      
      // Stop the camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }, 1000);
  };
  
  // Handle manual session code submission
  const handleCodeSubmit = () => {
    if (!sessionCode.trim()) {
      toast.error('Please enter a session code');
      return;
    }
    
    setScanned(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Success if code is 6 characters, failure otherwise (for demo)
      if (sessionCode.length === 6) {
        setSuccess(true);
        setSessionDetails({
          className: 'Database Systems',
          instructor: 'Dr. Jane Doe',
          room: 'B201',
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
        });
        toast.success('Attendance recorded successfully!');
      } else {
        setSuccess(false);
        toast.error('Invalid session code. Please try again.');
      }
    }, 1000);
  };
  
  // Auto focus on session code input
  useEffect(() => {
    if (scanTab === 'code') {
      const input = document.getElementById('sessionCode') as HTMLInputElement;
      if (input) input.focus();
    }
  }, [scanTab]);
  
  // Reset when changing tabs
  useEffect(() => {
    setScanned(false);
    setSuccess(null);
    setSessionDetails(null);
    setSessionCode('');
    
    // Stop any active camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [scanTab]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <Motion animation="fade-in">
            <h1 className="text-3xl font-bold mb-6">Scan Attendance QR Code</h1>
          </Motion>
          
          <div className="max-w-md mx-auto">
            <Motion animation="fade-in" delay={100}>
              <Card className="glass border p-6">
                {!scanned ? (
                  <>
                    <Tabs defaultValue={scanTab} onValueChange={setScanTab} className="mb-6">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="camera">
                          <Camera className="h-4 w-4 mr-2" />
                          Scan QR
                        </TabsTrigger>
                        <TabsTrigger value="code">
                          <QrCode className="h-4 w-4 mr-2" />
                          Enter Code
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="camera" className="mt-6">
                        <div className="text-center mb-4">
                          <p className="text-muted-foreground">
                            Point your camera at the QR code displayed by your instructor
                          </p>
                        </div>
                        
                        <div className="relative bg-black aspect-square rounded-lg overflow-hidden mb-6">
                          {scanning ? (
                            <>
                              <video 
                                ref={videoRef} 
                                className="w-full h-full object-cover"
                                playsInline
                                muted
                              ></video>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="border-2 border-white/30 w-2/3 h-2/3 rounded-lg"></div>
                              </div>
                              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                                Scanning...
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20">
                              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-muted-foreground text-sm">
                                Camera preview will appear here
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          ref={scanButtonRef}
                          className="w-full" 
                          onClick={startScanning} 
                          disabled={scanning}
                        >
                          {scanning ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Scanning...
                            </>
                          ) : (
                            <>
                              Start Camera
                              <Camera className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="code" className="mt-6">
                        <div className="text-center mb-4">
                          <p className="text-muted-foreground">
                            Enter the session code provided by your instructor
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="sessionCode">Session Code</Label>
                            <Input 
                              id="sessionCode" 
                              placeholder="e.g. ABC123" 
                              value={sessionCode}
                              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                              maxLength={6}
                              className="text-center text-lg tracking-widest font-mono"
                            />
                          </div>
                          
                          <Button 
                            className="w-full" 
                            onClick={handleCodeSubmit}
                          >
                            Submit Code
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </>
                ) : (
                  <div className="py-6">
                    {success === null ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h3 className="text-lg font-medium">Processing...</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Verifying your attendance
                        </p>
                      </div>
                    ) : success ? (
                      <Motion animation="fade-in">
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="rounded-full bg-green-100 p-3 mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-medium mb-1">Attendance Recorded!</h3>
                          <p className="text-muted-foreground text-center mb-6">
                            Your attendance has been successfully recorded
                          </p>
                          
                          <div className="w-full bg-muted/30 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Class:</span>
                                <span className="font-medium">{sessionDetails?.className}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Instructor:</span>
                                <span>{sessionDetails?.instructor}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Room:</span>
                                <span>{sessionDetails?.room}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Time:</span>
                                <span>{sessionDetails?.time}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date:</span>
                                <span>{sessionDetails?.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Motion>
                    ) : (
                      <Motion animation="fade-in">
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="rounded-full bg-red-100 p-3 mb-4">
                            <XCircle className="h-8 w-8 text-red-600" />
                          </div>
                          <h3 className="text-xl font-medium mb-1">QR Code Expired</h3>
                          <p className="text-muted-foreground text-center mb-6">
                            The QR code has expired or is invalid. Please ask your instructor for a new one.
                          </p>
                        </div>
                      </Motion>
                    )}
                    
                    <Button 
                      className="w-full mt-6" 
                      onClick={() => {
                        setScanned(false);
                        setSuccess(null);
                        setSessionDetails(null);
                      }}
                    >
                      Scan Again
                    </Button>
                  </div>
                )}
              </Card>
            </Motion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanQR;
