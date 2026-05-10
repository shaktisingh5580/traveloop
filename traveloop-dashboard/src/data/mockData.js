export const mockStats = [
  { title: 'Total Users', value: '42,892', change: '+12.5%', trend: 'up', color: '#22c55e' },
  { title: 'Trips Created', value: '15,204', change: '+18.2%', trend: 'up', color: '#22c55e' },
  { title: 'Active Users', value: '8,432', change: '+4.3%', trend: 'up', color: '#22c55e' },
  { title: 'MTD Revenue', value: '$124,500', change: '+22.1%', trend: 'up', color: '#22c55e' },
];

export const userGrowthData = [
  { name: 'Jan', users: 4000, trips: 2400 },
  { name: 'Feb', users: 3000, trips: 1398 },
  { name: 'Mar', users: 2000, trips: 9800 },
  { name: 'Apr', users: 2780, trips: 3908 },
  { name: 'May', users: 1890, trips: 4800 },
  { name: 'Jun', users: 2390, trips: 3800 },
  { name: 'Jul', users: 3490, trips: 4300 },
];

export const destinationData = [
  { name: 'Kyoto, Japan', count: 450, growth: '+15%' },
  { name: 'Amalfi, Italy', count: 390, growth: '+12%' },
  { name: 'Banff, Canada', count: 320, growth: '+8%' },
  { name: 'Bali, Indonesia', count: 280, growth: '+20%' },
  { name: 'Paris, France', count: 240, growth: '+5%' },
];

export const recentActivities = [
  { id: 1, user: 'John Doe', action: 'created a new trip to Tokyo', time: '2 mins ago', type: 'trip' },
  { id: 2, user: 'Sarah Smith', action: 'joined the premium plan', time: '15 mins ago', type: 'user' },
  { id: 3, user: 'Mike Johnson', action: 'reported a bug in itinerary', time: '1 hour ago', type: 'system' },
  { id: 4, user: 'Emma Wilson', action: 'posted a new community review', time: '3 hours ago', type: 'community' },
];

export const tripCategoryData = [
  { name: 'Adventure', value: 400 },
  { name: 'Cultural', value: 300 },
  { name: 'Relaxation', value: 300 },
  { name: 'Business', value: 200 },
];

export const usersTableData = [
  { id: '1', name: 'Alice Freeman', email: 'alice@example.com', role: 'Premium', status: 'Active', joined: '2023-10-12' },
  { id: '2', name: 'Bob Wright', email: 'bob@example.com', role: 'Basic', status: 'Inactive', joined: '2023-11-05' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Premium', status: 'Active', joined: '2023-09-20' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', joined: '2023-01-15' },
  { id: '5', name: 'Edward Norton', email: 'edward@example.com', role: 'Basic', status: 'Banned', joined: '2023-12-01' },
];

export const tripAnalyticsData = [
  { status: 'Planned', count: 420 },
  { status: 'Active', count: 150 },
  { status: 'Completed', count: 890 },
  { status: 'Cancelled', count: 45 },
];

export const revenueData = [
  { month: 'Jan', revenue: 85000, cost: 42000 },
  { month: 'Feb', revenue: 92000, cost: 45000 },
  { month: 'Mar', revenue: 110000, cost: 52000 },
  { month: 'Apr', revenue: 105000, cost: 48000 },
  { month: 'May', revenue: 130000, cost: 55000 },
  { month: 'Jun', revenue: 125000, cost: 53000 },
];

export const activityData = [
  { hour: '00:00', users: 120 },
  { hour: '04:00', users: 45 },
  { hour: '08:00', users: 450 },
  { hour: '12:00', users: 890 },
  { hour: '16:00', users: 1200 },
  { hour: '20:00', users: 750 },
];

export const communityFlags = [
  { id: 1, user: 'Jake Sully', reason: 'Spam', post: 'Check my cheap travel link!', status: 'Pending' },
  { id: 2, user: 'Neytiri', reason: 'Inappropriate', post: 'Bad language in review', status: 'Reviewed' },
  { id: 3, user: 'Quaritch', reason: 'Harassment', post: 'Mean comment to user', status: 'Pending' },
];

export const systemLogs = [
  { id: 1, service: 'API Gateway', status: 'Healthy', latency: '24ms' },
  { id: 2, service: 'Auth Service', status: 'Healthy', latency: '12ms' },
  { id: 3, service: 'Trip DB', status: 'Healthy', latency: '8ms' },
  { id: 4, service: 'CDN', status: 'Degraded', latency: '450ms' },
];

export const authUsers = [
  { id: 'admin', password: 'password123', name: 'John Admin', role: 'admin' },
  { id: 'super', password: 'superpassword', name: 'Sarah Super', role: 'super-admin' },
];
