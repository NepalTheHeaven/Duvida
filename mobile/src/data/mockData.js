// Sample data powering the supervisor dashboard charts and lists.
// In production these would come from aggregated Firestore queries / a backend function.
export const overviewStats = [
  { label: 'Total Accidents', value: '1,248', delta: '+15%', positive: true },
  { label: 'This Month', value: '342', delta: '+8%', positive: true },
  { label: 'Serious Accidents', value: '128', delta: '+10%', positive: true },
  { label: 'Fatal Accidents', value: '26', delta: '+4%', positive: true },
];

export const topRiskLocations = [
  { rank: 1, name: 'Koteshwor Chowk', score: 85 },
  { rank: 2, name: 'Thapathali', score: 78 },
  { rank: 3, name: 'Kalanki', score: 72 },
  { rank: 4, name: 'New Baneshwor', score: 65 },
  { rank: 5, name: 'Maitighar', score: 58 },
];

export const hotspots = [
  { id: 'h1', latitude: 27.6939, longitude: 85.347, weight: 25 },
  { id: 'h2', latitude: 27.6802, longitude: 85.3314, weight: 16 },
  { id: 'h3', latitude: 27.7008, longitude: 85.3, weight: 12 },
  { id: 'h4', latitude: 27.6766, longitude: 85.314, weight: 8 },
  { id: 'h5', latitude: 27.685, longitude: 85.34, weight: 7 },
  { id: 'h6', latitude: 27.706, longitude: 85.345, weight: 7 },
];

export const accidentsOverTime = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  data: [42, 38, 55, 78, 60, 52, 66],
};

export const accidentsByHour = {
  labels: ['0', '4', '8', '12', '16', '20', '23'],
  data: [10, 8, 45, 70, 55, 62, 30],
};

export const accidentsByDay = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [120, 150, 170, 140, 195, 160, 90],
};

export const severityBreakdown = [
  { name: 'Minor', count: 972, pct: '78%', color: '#7C3AED' },
  { name: 'Serious', count: 224, pct: '18%', color: '#FB923C' },
  { name: 'Fatal', count: 52, pct: '4%', color: '#F87171' },
];

export const recommendations = [
  {
    id: 'r1',
    location: 'Koteshwor Chowk',
    score: 85,
    priority: 'High Priority',
    note: 'High frequency of accidents in last 7 days.',
    action: 'Increase deployment during 7 AM - 11 AM and 5 PM - 9 PM.',
  },
  {
    id: 'r2',
    location: 'Thapathali',
    score: 78,
    priority: 'High Priority',
    note: 'Repeated incidents during peak hours.',
    action: 'Increase monitoring and patrol during peak hours.',
  },
  {
    id: 'r3',
    location: 'Kalanki',
    score: 72,
    priority: 'Medium Priority',
    note: 'Steady accident rate over the month.',
    action: 'Regular patrolling and awareness drive.',
  },
];

export const recentReports = [
  { id: 'ACC-2025-000128', location: 'Thapathali, Kathmandu', date: 'May 12, 2025 09:41 AM', severity: 'minor', type: 'Collision', by: 'Officer Ashwin' },
  { id: 'ACC-2025-000127', location: 'Koteshwor Chowk', date: 'May 12, 2025 07:10 AM', severity: 'serious', type: 'Collision', by: 'Officer Sekhar' },
  { id: 'ACC-2025-000126', location: 'Kalanki, Kathmandu', date: 'May 11, 2025 10:30 PM', severity: 'minor', type: 'Skidding', by: 'Officer Nabin' },
  { id: 'ACC-2025-000125', location: 'New Baneshwor', date: 'May 11, 2025 06:20 PM', severity: 'serious', type: 'Collision', by: 'Officer Bandana' },
];
