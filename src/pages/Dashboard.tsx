import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  BarChart3,
  BookOpen,
  UserCheck,
  TrendingUp
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  attendanceRate: number;
  upcomingClasses: Array<{
    id: string;
    course_name: string;
    session_time: string;
    room: string;
  }>;
  recentActivity: Array<{
    id: string;
    action: string;
    course: string;
    time: string;
  }>;
}

const Dashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    attendanceRate: 0,
    upcomingClasses: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch students count
      const { count: totalStudents } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Fetch today's attendance
      const today = new Date().toISOString().split('T')[0];
      const { data: todayAttendance } = await supabase
        .from('attendance_records')
        .select(`
          status,
          attendance_sessions!inner(session_date)
        `)
        .eq('attendance_sessions.session_date', today);

      const presentToday = todayAttendance?.filter(record => record.status === 'present').length || 0;
      const absentToday = todayAttendance?.filter(record => record.status === 'absent').length || 0;
      
      const attendanceRate = totalStudents ? Math.round((presentToday / (presentToday + absentToday)) * 100) || 0 : 0;

      // Mock upcoming classes (you can replace with real data)
      const upcomingClasses = [
        { id: '1', course_name: 'Mathematics', session_time: '9:00 AM', room: 'Room 301' },
        { id: '2', course_name: 'Physics', session_time: '11:00 AM', room: 'Lab 201' },
        { id: '3', course_name: 'Chemistry', session_time: '2:00 PM', room: 'Lab 302' }
      ];

      const recentActivity = [
        { id: '1', action: 'Attendance marked', course: 'Mathematics', time: '2 hours ago' },
        { id: '2', action: 'New student added', course: 'Physics', time: '4 hours ago' },
        { id: '3', action: 'Report generated', course: 'Chemistry', time: '6 hours ago' }
      ];

      setStats({
        totalStudents: totalStudents || 0,
        presentToday,
        absentToday,
        attendanceRate,
        upcomingClasses,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Avatar>
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback>{profile?.full_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{profile?.full_name}</p>
            <p className="text-sm text-muted-foreground capitalize">{profile?.role}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled in all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.presentToday}</div>
            <p className="text-xs text-muted-foreground">
              Students attended today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <XCircle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{stats.absentToday}</div>
            <p className="text-xs text-muted-foreground">
              Students absent today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.attendanceRate}%</div>
            <Progress value={stats.attendanceRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Attendance Overview</span>
            </CardTitle>
            <CardDescription>
              Today's attendance summary: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="font-medium">Present</span>
                </div>
                <span className="text-2xl font-bold text-success">{stats.presentToday}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-danger/10 border border-danger/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="font-medium">Absent</span>
                </div>
                <span className="text-2xl font-bold text-danger">{stats.absentToday}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="flex items-center space-x-1">
                  <UserCheck className="w-4 h-4" />
                  <span>Monitor Attendance</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Generate Reports</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Manage Courses</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Classes</span>
            </CardTitle>
            <CardDescription>
              Today's schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{classItem.course_name}</p>
                    <p className="text-sm text-muted-foreground">{classItem.room}</p>
                  </div>
                  <Badge variant="outline">{classItem.session_time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions and updates in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.course}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;