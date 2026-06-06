export const colors = {
  primary: '#8B5CF6',
  primaryLight: '#C4B5FD',
  bg: '#0F172A',
  surface: '#1E293B',
  surfaceAlt: '#263548',
  cardHighlight: '#1E2D45',
  inputBg: '#162032',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textSecondary: '#CBD5E1',
  border: '#334155',
  overlay: 'rgba(0,0,0,0.6)',
  error: '#EF4444',
  success: '#10B981',
  fatal: '#EF4444',
  serious: '#F59E0B',
  minor: '#3B82F6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  pill: 9999,
  full: 9999,
};

export const radius = borderRadius;

export const gradients = {
  primary: ['#8B5CF6', '#6D28D9'],
  surface: ['#1E293B', '#0F172A'],
};

export const severityColor = (severity) => {
  switch ((severity || '').toLowerCase()) {
    case 'fatal': return colors.fatal;
    case 'serious': return colors.serious;
    case 'minor': return colors.minor;
    default: return colors.textMuted;
  }
};
