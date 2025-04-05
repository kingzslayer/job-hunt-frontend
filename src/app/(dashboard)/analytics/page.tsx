'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AnalyticsPage() {
  // Dummy analytics data
  const monthlyApplications = [
    { month: 'Jan', count: 5, interviews: 2 },
    { month: 'Feb', count: 8, interviews: 3 },
    { month: 'Mar', count: 12, interviews: 4 },
    { month: 'Apr', count: 7, interviews: 2 },
  ];

  const responseRates = [
    { company: 'Tech Startups', rate: 30 },
    { company: 'Mid-size Companies', rate: 45 },
    { company: 'Enterprise', rate: 20 },
    { company: 'Agencies', rate: 40 },
  ];

  const jobSourceStats = [
    { source: 'LinkedIn', count: 12, percentage: 48 },
    { source: 'Indeed', count: 5, percentage: 20 },
    { source: 'Company Website', count: 4, percentage: 16 },
    { source: 'Referrals', count: 3, percentage: 12 },
    { source: 'Other', count: 1, percentage: 4 },
  ];

  const timelineData = [
    { milestone: 'Application', avgDays: 0 },
    { milestone: 'Initial Response', avgDays: 5 },
    { milestone: 'First Interview', avgDays: 10 },
    { milestone: 'Technical Assessment', avgDays: 14 },
    { milestone: 'Final Interview', avgDays: 21 },
    { milestone: 'Offer', avgDays: 28 },
  ];

  // Enhanced chart data for the area chart
  const weeklyActivity = [
    { week: 'Week 1', applications: 3, responses: 1, interviews: 0 },
    { week: 'Week 2', applications: 5, responses: 2, interviews: 1 },
    { week: 'Week 3', applications: 2, responses: 3, interviews: 2 },
    { week: 'Week 4', applications: 8, responses: 3, interviews: 1 },
  ];

  // Chart colors
  const colors = {
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryLight: 'hsla(221.2 83.2% 53.3%, 0.6)',
    secondary: 'hsl(215 20.2% 65.1%)',
    success: 'hsl(142.1 76.2% 36.3%)',
    warning: 'hsl(47.7 100% 50%)',
    danger: 'hsl(0 84.2% 60.2%)',
    background: 'hsl(220 14.3% 95.9%)',
    foreground: 'hsl(222.2 47.4% 11.2%)',
  };

  // Processed data for pie chart
  const pieData = jobSourceStats.map((item) => ({
    name: item.source,
    value: item.percentage,
  }));

  // Calculate cumulative days for line chart
  const lineData = timelineData.map((item) => ({
    name: item.milestone,
    days: item.avgDays,
  }));

  // Prepare data for response rate chart
  const responseData = responseRates.map((item) => ({
    name: item.company,
    rate: item.rate,
  }));

  // COLORS for pie chart - enhanced color palette
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Custom tooltip formatter
  const customTooltipFormatter = (value: number, name: string): [string, string] => {
    const formattedName =
      name === 'count'
        ? 'Applications'
        : name === 'interviews'
          ? 'Interviews'
          : name === 'rate'
            ? 'Response Rate'
            : name === 'days'
              ? 'Timeline (Days)'
              : name;

    return [`${value}${name === 'rate' ? '%' : ''}`, formattedName];
  };

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Job Search Analytics</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Applications Chart (Bar Chart) - Improved with interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Applications & Interviews</CardTitle>
            <CardDescription>Track your application and interview progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyApplications}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={customTooltipFormatter} />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Applications"
                    fill={colors.primary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="interviews"
                    name="Interviews"
                    fill={colors.success}
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Trends (Area Chart) - New chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Job Search Activity</CardTitle>
            <CardDescription>Track your weekly job search progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyActivity}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    name="Applications"
                    stroke={colors.primary}
                    fill={colors.primaryLight}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="responses"
                    name="Responses"
                    stroke={colors.warning}
                    fill="rgba(245, 158, 11, 0.3)"
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Area
                    type="monotone"
                    dataKey="interviews"
                    name="Interviews"
                    stroke={colors.success}
                    fill="rgba(16, 185, 129, 0.3)"
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Sources (Pie Chart) - Enhanced with better labeling */}
        <Card>
          <CardHeader>
            <CardTitle>Job Sources</CardTitle>
            <CardDescription>Where your applications come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill={colors.primary}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    animationDuration={1500}
                    animationBegin={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hiring Timeline (Line Chart) - Enhanced with better UX */}
        <Card>
          <CardHeader>
            <CardTitle>Average Hiring Timeline</CardTitle>
            <CardDescription>Average days between application stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    label={{
                      value: 'Days',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' },
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => [`Day ${value}`, 'Timeline']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend formatter={() => <span className="text-sm">Hiring Timeline</span>} />
                  <Line
                    type="monotone"
                    dataKey="days"
                    name="Days"
                    stroke={colors.primary}
                    strokeWidth={3}
                    dot={{ r: 6, fill: 'white', strokeWidth: 3 }}
                    activeDot={{ r: 8, fill: colors.primary, stroke: 'white', strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Response Rate Analysis (Horizontal Bar Chart) - Repositioned and enhanced */}
        <Card>
          <CardHeader>
            <CardTitle>Response Rate by Company Type</CardTitle>
            <CardDescription>Percentage of applications that received responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={responseData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Response Rate']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="rate"
                    name="Response Rate"
                    fill={colors.primary}
                    radius={[0, 4, 4, 0]}
                    animationDuration={1500}
                    label={{
                      position: 'right',
                      formatter: (value: number) => `${value}%`,
                      fill: colors.foreground,
                      fontSize: 12,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights Card - Enhanced visual presentation */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Summary of your job search performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <div className="text-muted-foreground text-sm">
                    Application to Interview Ratio
                  </div>
                  <div className="text-2xl font-bold">32%</div>
                  <div className="text-muted-foreground mt-1 text-xs">Industry avg: 25%</div>
                  <div className="bg-secondary/30 mt-2 h-1.5 w-full rounded-full">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Average Response Time</div>
                  <div className="text-2xl font-bold">5.3 days</div>
                  <div className="text-muted-foreground mt-1 text-xs">Improved from 7.1 days</div>
                  <div className="bg-secondary/30 mt-2 h-1.5 w-full rounded-full">
                    <div className="bg-success h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-muted-foreground text-sm">Interview Success Rate</div>
                  <div className="text-2xl font-bold">28%</div>
                  <div className="text-muted-foreground mt-1 text-xs">Industry avg: 20%</div>
                  <div className="bg-secondary/30 mt-2 h-1.5 w-full rounded-full">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Most Successful Skills</div>
                  <div className="text-2xl font-bold">React, TypeScript</div>
                  <div className="text-muted-foreground mt-1 text-xs">Highest callback rate</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                      React
                    </span>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                      TypeScript
                    </span>
                    <span className="bg-secondary/20 text-muted-foreground rounded-full px-2 py-1 text-xs">
                      Next.js
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
