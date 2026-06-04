// Shared data structure for consistency between apps
export const REPORT_COLLECTION = 'reports';

export const ReportSchema = {
  id: '',
  userId: '',
  timestamp: null,
  dataType: '', // e.g., 'energy', 'waste', 'water'
  value: 0,
  location: {
    lat: 0,
    lng: 0
  },
  notes: ''
};
