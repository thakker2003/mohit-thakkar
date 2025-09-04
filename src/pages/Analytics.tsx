import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  Target,
  Award,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  // Mock data for charts
  const attendanceTrendData = [
    { month: 'Jan', rate: 85 },
    { month: 'Feb', rate: 88 },
    { month: 'Mar', rate: 82 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 87 },
    { month: 'Jun', rate: 92 }
  ];

  const dailyAttendanceData = [
    { day: 'Mon', present: 120, absent: 15, late: 5 },
    { day: 'Tue', present: 118, absent: 18, late: 4 },
    { day: 'Wed', present: 125, absent: 12, late: 3 },
    { day: 'Thu', present: 115, absent: 20, late: 5 },
    { day: 'Fri', present: 110, absent: 25, late: 5 },
    { day: 'Sat', present: 95, absent: 35, late: 10 }
  ];

  const courseEngagementData = [
    { course: 'Mathematics', engagement: 85, color: 'hsl(var(--chart-1))' },
    { course: 'Physics', engagement: 78, color: 'hsl(var(--chart-2))' },
    { course: 'Chemistry', engagement: 92, color: 'hsl(var(--chart-3))' },
    { course: 'Biology', engagement: 88, color: 'hsl(var(--chart-4))' },
    { course: 'Computer Science', engagement: 95, color: 'hsl(var(--chart-5))' }
  ];

  const attendanceDistribution = [
    { name: 'Present', value: 85, color: 'hsl(var(--success))' },
    { name: 'Absent', value: 10, color: 'hsl(var(--danger))' },
    { name: 'Late', value: 5, color: 'hsl(var(--warning))' }
  ];

  const chartConfig = {
    rate: {
      label: "Attendance Rate",
      color: "hsl(var(--chart-1))",
    },
    present: {
      label: "Present",
      color: "hsl(var(--success))",
    },
    absent: {
      label: "Absent", 
      color: "hsl(var(--danger))",
    },
    late: {
      label: "Late",
      color: "hsl(var(--warning))",
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into student attendance patterns
          </p>
        </div>
        <Button className="flex items-center space-x-2 mt-4 md:mt-0">
          <Download className="w-4 h-4" />
          <span>Generate Report</span>
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Active class sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">
              Student participation rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Attendance Trends</TabsTrigger>
          <TabsTrigger value="engagement">Course Engagement</TabsTrigger>
          <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Trend Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends Over Time</CardTitle>
                <CardDescription>
                  Monthly attendance rate percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={attendanceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Daily Attendance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Breakdown</CardTitle>
                <CardDescription>
                  Daily attendance distribution for this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="present" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="absent" fill="hsl(var(--danger))" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="late" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Attendance Distribution</CardTitle>
              <CardDescription>
                Breakdown of student attendance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="w-full max-w-[300px]">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={attendanceDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {attendanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4 flex-1">
                  {attendanceDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.value}%</div>
                        <div className="text-sm text-muted-foreground">
                          {item.value === 85 ? '10,493' : item.value === 10 ? '1,235' : '617'} students
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Engagement Levels</CardTitle>
              <CardDescription>
                Engagement percentage by course based on attendance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseEngagementData.map((course) => (
                  <div key={course.course} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{course.course}</span>
                      <span className="text-sm text-muted-foreground">{course.engagement}%</span>
                    </div>
                    <Progress 
                      value={course.engagement} 
                      className="h-2"
                      style={{
                        '--progress-background': course.color
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Highest Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">Computer Science</div>
                <p className="text-xs text-muted-foreground">95% engagement rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">Physics</div>
                <p className="text-xs text-muted-foreground">78% engagement rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.6%</div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Reports</CardTitle>
              <CardDescription>
                Generate comprehensive attendance and engagement reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Detailed reporting functionality will be available here
                </p>
                <Button>Generate Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;