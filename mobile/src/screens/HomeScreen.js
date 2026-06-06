import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Screen, Card, PrimaryButton, SeverityBadge } from '../components';
import { colors, spacing, radius } from '../theme';
import { useAuth } from '../context/AuthContext';
import { fetchRecentAccidents } from '../services/accidentService';
import { recentReports as fallbackReports } from '../data/mockData';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [reports, setReports] = useState(fallbackReports);
  const [refreshing, setRefreshing] = useState(false);
  const officerName = (user?.displayName || user?.email?.split('@')[0] || 'Officer').replace(/^\w/, (c) => c.toUpperCase());

  const load = useCallback(async () => {
    try {
      const data = await fetchRecentAccidents(5);
      if (data.length) {
        setReports(
          data.map((d) => ({
            id: d.reportId || d.id,
            location: d.location?.name || 'Unknown',
            date: d.occurredAt?.toDate ? d.occurredAt.toDate().toLocaleString() : '',
            severity: d.severity,
          }))
        );
      }
    } catch (_) {
      /* keep fallback data offline */
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  return (
    <Screen edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>{greeting()},</Text>
            <Text style={styles.name}>Officer {officerName} 👋</Text>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Highlight card */}
        <Card highlight style={styles.highlight}>
          <View style={styles.highlightTop}>
            <Text style={styles.highlightLabel}>Reported Today</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.highlightValue}>3</Text>
        </Card>

        {/* Two stat cards */}
        <View style={styles.statRow}>
          <Card style={styles.statHalf}>
            <Text style={styles.statLabel}>Total Reports</Text>
            <Text style={styles.statValue}>128</Text>
          </Card>
          <Card style={styles.statHalf}>
            <Text style={styles.statLabel}>This Month</Text>
            <View style={styles.statInline}>
              <Text style={styles.statValue}>82</Text>
              <Text style={styles.statDelta}>+12%</Text>
            </View>
          </Card>
        </View>

        <PrimaryButton
          title="Report New Accident"
          icon={<Ionicons name="add" size={18} color="#fff" />}
          onPress={() => navigation.navigate('Report')}
          style={{ marginVertical: spacing.lg }}
        />

        {/* Recent reports */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {reports.map((r) => (
          <Card key={r.id} style={styles.reportRow}>
            <MaterialCommunityIcons name="car-emergency" size={22} color={colors.primaryLight} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.reportLoc}>{r.location}</Text>
              <Text style={styles.reportDate}>{r.date}</Text>
            </View>
            <SeverityBadge severity={r.severity} />
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  greet: { color: colors.textSecondary, fontSize: 14 },
  name: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 2 },
  bell: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 11, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.fatal },
  highlight: { marginBottom: spacing.md },
  highlightTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  highlightLabel: { color: '#E9DEFF', fontSize: 13 },
  highlightValue: { color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 4 },
  viewAll: { color: colors.primaryLight, fontSize: 13, fontWeight: '500' },
  statRow: { flexDirection: 'row', gap: spacing.md },
  statHalf: { flex: 1 },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  statValue: { color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 4 },
  statInline: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  statDelta: { color: colors.success, fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  reportRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md, paddingVertical: spacing.md },
  reportLoc: { color: colors.text, fontSize: 14, fontWeight: '500' },
  reportDate: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
});
