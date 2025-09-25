"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const contentData = [
  { month: 'Jan', articles: 15, courses: 3, projects: 8 },
  { month: 'Feb', articles: 22, courses: 5, projects: 12 },
  { month: 'Mar', articles: 18, courses: 4, projects: 10 },
  { month: 'Apr', articles: 28, courses: 6, projects: 15 },
  { month: 'May', articles: 25, courses: 7, projects: 18 },
  { month: 'Jun', articles: 32, courses: 5, projects: 20 },
  { month: 'Jul', articles: 29, courses: 8, projects: 16 },
  { month: 'Aug', articles: 35, courses: 6, projects: 22 },
  { month: 'Sep', articles: 31, courses: 9, projects: 19 },
  { month: 'Oct', articles: 38, courses: 7, projects: 25 },
  { month: 'Nov', articles: 42, courses: 10, projects: 28 },
  { month: 'Dec', articles: 45, courses: 8, projects: 30 }
]

const contentTypeData = [
  { name: 'Articles', value: 165, color: '#0d9488' },
  { name: 'Courses', value: 42, color: '#6366f1' },
  { name: 'Projects', value: 89, color: '#f59e0b' },
  { name: 'Media', value: 234, color: '#8b5cf6' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg border border-white/20 shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className={`text-sm`} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg border border-white/20 shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
        <p className="text-sm" style={{ color: data.payload.color }}>
          {`Count: ${data.value}`}
        </p>
      </div>
    )
  }
  return null
}

export function ContentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Content Production
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Monthly content creation across different types
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={contentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="articlesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="coursesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="articles"
                  stackId="1"
                  stroke="#0d9488"
                  fill="url(#articlesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="courses"
                  stackId="1"
                  stroke="#6366f1"
                  fill="url(#coursesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="url(#projectsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ContentDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Content Distribution
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total content by type
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {contentTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}