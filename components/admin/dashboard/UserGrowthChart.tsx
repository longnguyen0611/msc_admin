"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'

const userGrowthData = [
  { month: 'Jan', newUsers: 145, activeUsers: 1200 },
  { month: 'Feb', newUsers: 178, activeUsers: 1350 },
  { month: 'Mar', newUsers: 162, activeUsers: 1480 },
  { month: 'Apr', newUsers: 195, activeUsers: 1650 },
  { month: 'May', newUsers: 210, activeUsers: 1820 },
  { month: 'Jun', newUsers: 188, activeUsers: 1950 },
  { month: 'Jul', newUsers: 225, activeUsers: 2100 },
  { month: 'Aug', newUsers: 198, activeUsers: 2250 },
  { month: 'Sep', newUsers: 242, activeUsers: 2420 },
  { month: 'Oct', newUsers: 268, activeUsers: 2650 },
  { month: 'Nov', newUsers: 285, activeUsers: 2890 },
  { month: 'Dec', newUsers: 312, activeUsers: 3150 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg border border-white/20 shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className={`text-sm`} style={{ color: entry.color }}>
            {`${entry.dataKey === 'newUsers' ? 'New Users' : 'Active Users'}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function UserGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            User Growth
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New user registrations and active users
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="newUsersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
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
                  yAxisId="newUsers"
                  orientation="left"
                />
                <YAxis 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  axisLine={false}
                  tickLine={false}
                  yAxisId="activeUsers"
                  orientation="right"
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="newUsers"
                  dataKey="newUsers"
                  fill="url(#newUsersGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  yAxisId="activeUsers"
                  dataKey="activeUsers"
                  fill="url(#activeUsersGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}