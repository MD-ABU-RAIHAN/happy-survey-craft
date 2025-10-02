import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Brain,
  Route,
  Zap,
} from 'lucide-react';
import { LogicAnalytics as LogicAnalyticsType, LogicSuggestion } from '@/types/logic';

interface LogicAnalyticsProps {
  analytics: LogicAnalyticsType;
  onOptimizationSelect: (suggestion: LogicSuggestion) => void;
}

const LogicAnalytics: React.FC<LogicAnalyticsProps> = ({
  analytics,
  onOptimizationSelect,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('completion');

  // Sample data - in real implementation, this would come from actual analytics
  const pathData = analytics.pathAnalysis.mostCommonPaths.map((path, index) => ({
    name: `Path ${index + 1}`,
    frequency: path.frequency,
    avgTime: Math.round(path.averageCompletionTime / 60), // Convert to minutes
    path: path.path.join(' → '),
  }));

  const dropOffData = analytics.pathAnalysis.dropOffPoints.map((point, index) => ({
    name: `Node ${index + 1}`,
    dropOffRate: Math.round(point.dropOffRate * 100),
    nodeId: point.nodeId,
  }));

  const performanceData = [
    {
      metric: 'Completion Rate',
      value: Math.round(analytics.performanceMetrics.completionRate * 100),
      change: +12,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      metric: 'Avg. Completion Time',
      value: `${Math.round(analytics.performanceMetrics.averageCompletionTime / 60)}m`,
      change: -8,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      metric: 'Engagement Score',
      value: Math.round(analytics.performanceMetrics.engagementScore * 100),
      change: +15,
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      metric: 'Response Quality',
      value: Math.round(analytics.performanceMetrics.responseQuality * 100),
      change: +5,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? TrendingUp : change < 0 ? TrendingDown : Users;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceData.map((metric) => {
          const ChangeIcon = getChangeIcon(metric.change);
          return (
            <Card key={metric.metric} className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(metric.change)}`}>
                  <ChangeIcon className="w-4 h-4" />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.metric}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="paths" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="paths">Response Paths</TabsTrigger>
          <TabsTrigger value="dropoffs">Drop-off Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Most Common Response Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pathData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{label}</p>
                              <p className="text-sm text-muted-foreground mb-2">{data.path}</p>
                              <p className="text-sm">Frequency: {payload[0].value}%</p>
                              <p className="text-sm">Avg. Time: {data.avgTime} minutes</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {pathData.slice(0, 3).map((path, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Path {index + 1}</div>
                      <div className="text-xs text-muted-foreground">{path.path}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{path.frequency}%</div>
                      <div className="text-xs text-muted-foreground">{path.avgTime}m avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dropoffs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Drop-off Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dropOffData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <p className="font-semibold">{label}</p>
                              <p className="text-sm">Drop-off Rate: {payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="dropOffRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {dropOffData.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{point.name}</div>
                      <div className="text-xs text-muted-foreground">Node ID: {point.nodeId}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={point.dropOffRate} className="w-20" />
                      <span className="text-sm font-semibold text-red-600">{point.dropOffRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                Optimization Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.optimizationOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onOptimizationSelect(opportunity)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm">{opportunity.title}</h4>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ color: `hsl(${Math.round(opportunity.confidence * 120)}, 70%, 45%)` }}
                          >
                            {Math.round(opportunity.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                        {opportunity.expectedImprovement && (
                          <div className="flex gap-4 text-xs">
                            {opportunity.expectedImprovement.completionRate && (
                              <div className="flex items-center gap-1 text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                +{Math.round(opportunity.expectedImprovement.completionRate * 100)}% completion
                              </div>
                            )}
                            {opportunity.expectedImprovement.engagement && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <Zap className="w-3 h-3" />
                                +{Math.round(opportunity.expectedImprovement.engagement * 100)}% engagement
                              </div>
                            )}
                            {opportunity.expectedImprovement.responseQuality && (
                              <div className="flex items-center gap-1 text-purple-600">
                                <CheckCircle className="w-3 h-3" />
                                +{Math.round(opportunity.expectedImprovement.responseQuality * 100)}% quality
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">High Engagement Detected</div>
                      <div className="text-xs text-muted-foreground">
                        Users with high engagement scores complete 23% faster
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Drop-off Warning</div>
                      <div className="text-xs text-muted-foreground">
                        Question 3 has 18% higher drop-off than average
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Optimization Opportunity</div>
                      <div className="text-xs text-muted-foreground">
                        Adding conditional logic could improve completion by 15%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Response Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: 68, color: '#10b981' },
                          { name: 'Abandoned', value: 22, color: '#ef4444' },
                          { name: 'In Progress', value: 10, color: '#f59e0b' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: 'Completed', value: 68, color: '#10b981' },
                          { name: 'Abandoned', value: 22, color: '#ef4444' },
                          { name: 'In Progress', value: 10, color: '#f59e0b' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Completed (68%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Abandoned (22%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span>In Progress (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogicAnalytics;