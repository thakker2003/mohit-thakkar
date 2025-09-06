import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  QrCode, 
  Clock,
  Users,
  Calendar,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';
import QrScanner from 'react-qr-scanner';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceMethod, setAttendanceMethod] = useState('qr_code');
  const [sessionActive, setSessionActive] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const mockClasses = [
    { id: '1', name: 'Mathematics - Section A', time: '9:00 AM', students: 45 },
    { id: '2', name: 'Physics - Lab Session', time: '11:00 AM', students: 30 },
    { id: '3', name: 'Chemistry - Section B', time: '2:00 PM', students: 38 }
  ];

  const mockStudents = [
    { id: '1', name: 'John Doe', studentId: 'CS001', status: 'present', time: '9:05 AM' },
    { id: '2', name: 'Jane Smith', studentId: 'CS002', status: 'present', time: '9:03 AM' },
    { id: '3', name: 'Mike Johnson', studentId: 'CS003', status: 'late', time: '9:15 AM' },
    { id: '4', name: 'Sarah Wilson', studentId: 'CS004', status: 'absent', time: '-' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'late': return 'bg-warning text-warning-foreground';
      case 'absent': return 'bg-danger text-danger-foreground';
      default: return 'bg-secondary';
    }
  };

  const handleQrScan = (data: any) => {
    if (data && sessionActive) {
      setScannedData(data.text || data);
      // Here you would typically process the scanned data to mark attendance
      console.log('QR Code scanned:', data.text || data);
    }
  };

  const handleScanError = (err: any) => {
    console.error('QR Scanner error:', err);
  };

  const handleStartSession = () => {
    setSessionActive(true);
  };

  const handleStopSession = () => {
    setSessionActive(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">
            Monitor and manage student attendance
          </p>
        </div>
      </div>

      {/* Class Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Select Class</span>
          </CardTitle>
          <CardDescription>
            Choose a class and attendance method to begin monitoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{cls.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{cls.time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Attendance Method</label>
              <Select value={attendanceMethod} onValueChange={setAttendanceMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qr_code">
                    <div className="flex items-center space-x-2">
                      <QrCode className="w-4 h-4" />
                      <span>QR Code Scanner</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            {!sessionActive ? (
              <Button 
                onClick={handleStartSession} 
                className="flex items-center space-x-2"
                disabled={!selectedClass}
              >
                <Play className="w-4 h-4" />
                <span>Start Attendance</span>
              </Button>
            ) : (
              <Button 
                onClick={handleStopSession}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <Pause className="w-4 h-4" />
                <span>Stop Session</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Monitoring</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Method Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>QR Code Scanner</span>
                </CardTitle>
                <CardDescription>
                  {sessionActive ? 'Scanning for QR codes...' : 'Start session to begin scanning'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessionActive ? (
                  <div className="space-y-4">
                    <div className="aspect-square bg-background rounded-lg overflow-hidden border">
                      <QrScanner
                        onScan={handleQrScan}
                        onError={handleScanError}
                        style={{ width: '100%', height: '100%' }}
                        constraints={{
                          video: { facingMode: 'environment' }
                        }}
                      />
                    </div>
                    {scannedData && (
                      <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg border border-success/20">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <div>
                          <p className="text-sm font-medium">QR Code Detected</p>
                          <p className="text-xs text-muted-foreground">Data: {scannedData}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Start session to begin scanning</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Live Attendance Feed */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Live Attendance Feed</span>
                  </div>
                  {sessionActive && (
                    <Badge className="bg-success text-success-foreground">
                      Active Session
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Real-time attendance updates for {selectedClass ? mockClasses.find(c => c.id === selectedClass)?.name : 'selected class'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <span className="text-sm font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.studentId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-muted-foreground">{student.time}</span>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Attendance History</span>
              </CardTitle>
              <CardDescription>
                View past attendance records and sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Attendance history will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;