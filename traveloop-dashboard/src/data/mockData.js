/**
 * Mock data for offline/demo mode.
 * Used as fallback when the backend is unavailable.
 */

export const authUsers = [
  { id: 'admin', password: 'password123', name: 'Admin User', role: 'admin' },
  { id: 'super', password: 'superpassword', name: 'Super Admin', role: 'super-admin' },
];

export const mockStats = [
  { title: 'Total Users', value: '12,847', change: '+14%', trend: 'up' },
  { title: 'Active Trips', value: '3,421', change: '+8%', trend: 'up' },
  { title: 'Revenue', value: '$48.2K', change: '+23%', trend: 'up' },
  { title: 'Engagement', value: '89%', change: '-2%', trend: 'down' },
];

export const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 800 },
  { name: 'Apr', users: 1000 },
  { name: 'May', users: 1200 },
  { name: 'Jun', users: 1100 },
  { name: 'Jul', users: 1400 },
  { name: 'Aug', users: 1600 },
  { name: 'Sep', users: 1500 },
  { name: 'Oct', users: 1800 },
  { name: 'Nov', users: 2000 },
  { name: 'Dec', users: 2200 },
];

export const tripCategoryData = [
  { name: 'Adventure', value: 35 },
  { name: 'Cultural', value: 28 },
  { name: 'Beach', value: 22 },
  { name: 'City', value: 15 },
];

export const recentActivities = [
  { id: 1, user: 'Arjun Mehta', action: 'created a trip to Kyoto', time: '2 min ago' },
  { id: 2, user: 'Priya Sharma', action: 'shared their Bali itinerary', time: '15 min ago' },
  { id: 3, user: 'Rahul Singh', action: 'joined the platform', time: '1 hour ago' },
  { id: 4, user: 'Ananya Gupta', action: 'completed their Paris trip', time: '3 hours ago' },
  { id: 5, user: 'Vikram Patel', action: 'updated their profile', time: '5 hours ago' },
];

export const usersTableData = [
  { name: 'Arjun Mehta', email: 'arjun@traveloop.com', role: 'User', status: 'Active', joined: '2024-01-15' },
  { name: 'Priya Sharma', email: 'priya@traveloop.com', role: 'User', status: 'Active', joined: '2024-02-20' },
  { name: 'Rahul Singh', email: 'rahul@traveloop.com', role: 'Admin', status: 'Active', joined: '2024-03-10' },
  { name: 'Ananya Gupta', email: 'ananya@traveloop.com', role: 'User', status: 'Inactive', joined: '2024-04-05' },
  { name: 'Vikram Patel', email: 'vikram@traveloop.com', role: 'User', status: 'Active', joined: '2024-05-12' },
];
