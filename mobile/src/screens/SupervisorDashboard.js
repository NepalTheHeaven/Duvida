import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../components';
import { colors, spacing, radius } from '../theme';
import DashboardOverviewScreen from './DashboardOverviewScreen';
import AnalyticsScreen from './AnalyticsScreen';
import DeploymentScreen from './DeploymentScreen';
import { logout } from '../services/accidentService';

const NAV = [
  { key: 'overview', label: 'Overview', icon: 'grid-outline' },
  { key: 'analytics', label: 'Analytics', icon: 'stats-chart-outline' },
  { key: 'deployment', label: 'Deployment', icon: 'navigate-outline' },
];

const Body = ({ tab }) => {
  if (tab === 'analytics') return <AnalyticsScreen />;
  if (tab === 'deployment') return <DeploymentScreen />;
  return <DashboardOverviewScreen />;
};

export default function SupervisorDashboard() {
  const [tab, setTab] = useState('overview');
  const { width } = useWindowDimensions();
  const wide = width >= 900; // show sidebar on tablet / web

  return (
    <Screen edges={wide ? ['top', 'bottom'] : ['top']}>
      <View style={[styles.layout, wide && styles.layoutWide]}>
        {wide ? (
          <View style={styles.sidebar}>
            <View style={styles.brand}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.brandLogo}>
                <MaterialCommunityIcons name="shield-car" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.brandText}>Traffic Intelligence{'\n'}Dashboard</Text>
            </View>
            {NAV.map((n) => (
              <TouchableOpacity
                key={n.key}
                style={[styles.navItem, tab === n.key && styles.navItemActive]}
                onPress={() => setTab(n.key)}
              >
                <Ionicons name={n.icon} size={18} color={tab === n.key ? '#fff' : colors.textMuted} />
                <Text style={[styles.navLabel, tab === n.key && { color: '#fff' }]}>{n.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.navItem, { marginTop: 'auto' }]} onPress={() => logout()}>
              <Ionicons name="log-out-outline" size={18} color={colors.textMuted} />
              <Text style={styles.navLabel}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topTabs} contentContainerStyle={{ gap: spacing.sm, paddingHorizontal: spacing.lg }}>
            {NAV.map((n) => (
              <TouchableOpacity
                key={n.key}
                style={[styles.topTab, tab === n.key && styles.topTabActive]}
                onPress={() => setTab(n.key)}
              >
                <Text style={[styles.topTabText, tab === n.key && { color: '#fff' }]}>{n.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={{ flex: 1 }}>
          <Body tab={tab} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  layout: { flex: 1 },
  layoutWide: { flexDirection: 'row' },
  sidebar: { width: 220, borderRightWidth: 1, borderRightColor: colors.border, padding: spacing.lg, backgroundColor: colors.surface },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl },
  brandLogo: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  brandText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  navItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 12, paddingHorizontal: spacing.md, borderRadius: radius.md, marginBottom: 4 },
  navItemActive: { backgroundColor: colors.primary },
  navLabel: { color: colors.textMuted, fontSize: 14 },
  topTabs: { maxHeight: 52, marginVertical: spacing.sm },
  topTab: { paddingHorizontal: spacing.lg, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
  topTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  topTabText: { color: colors.textSecondary, fontSize: 13, fontWeight: '500' },
});
