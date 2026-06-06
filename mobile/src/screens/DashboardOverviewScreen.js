import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, StatCard, SeverityBadge } from '../components';
import { colors, spacing, radius } from '../theme';
import {
  overviewStats,
  topRiskLocations,
  hotspots,
  recentReports,
} from '../data/mockData';

// react-native-maps is native-only; load lazily so web bundling doesn't break.
let MapView, Marker;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

function HotspotMap() {
  if (Platform.OS === 'web' || !MapView) {
    // Web / fallback: schematic hotspot view
    return (
      <View style={styles.mapFallback}>
        {hotspots.map((h, i) => (
          <View
            key={h.id}
            style={[
              styles.blip,
              {
                left: `${15 + ((i * 27) % 70)}%`,
                top: `${20 + ((i * 33) % 55)}%`,
                width: 22 + h.weight,
                height: 22 + h.weight,
                borderRadius: (22 + h.weight) / 2,
                backgroundColor:
                  h.weight > 15 ? colors.fatal + 'cc' : h.weight > 8 ? colors.serious + 'cc' : colors.primary + 'cc',
              },
            ]}
          >
            <Text style={styles.blipText}>{h.weight}</Text>
          </View>
        ))}
      </View>
    );
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={{ latitude: 27.69, longitude: 85.33, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
    >
      {hotspots.map((h) => (
        <Marker key={h.id} coordinate={{ latitude: h.latitude, longitude: h.longitude }} title={`Risk ${h.weight}`} />
      ))}
    </MapView>
  );
}

export default function DashboardOverviewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h1}>Overview</Text>
        <View style={styles.dateChip}>
          <Text style={styles.dateChipText}>May 6 – May 12, 2025</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        </View>
      </View>

      {/* Stat grid */}
      <View style={styles.grid}>
        {overviewStats.map((s) => (
          <StatCard key={s.label} {...s} style={styles.gridItem} />
        ))}
      </View>

      {/* Hotspot map */}
      <Card style={{ marginTop: spacing.lg }}>
        <View style={styles.cardHead}>
          <Text style={styles.cardTitle}>Accident Hotspot Map</Text>
          <View style={styles.dateChip}>
            <Text style={styles.dateChipText}>Heatmap</Text>
            <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
          </View>
        </View>
        <View style={styles.mapWrap}>
          <HotspotMap />
        </View>
        <View style={styles.legend}>
          <Text style={styles.legendLabel}>Low Risk</Text>
          <View style={styles.legendBar} />
          <Text style={styles.legendLabel}>High Risk</Text>
        </View>
      </Card>

      {/* Top risk locations */}
      <Card style={{ marginTop: spacing.lg }}>
        <Text style={styles.cardTitle}>Top Risk Locations</Text>
        {topRiskLocations.map((l) => (
          <View key={l.rank} style={styles.riskRow}>
            <Text style={styles.rank}>{l.rank}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.riskName}>{l.name}</Text>
              <Text style={styles.riskSub}>Risk Score</Text>
            </View>
            <Text style={styles.riskScore}>{l.score}</Text>
          </View>
        ))}
      </Card>

      {/* Recent accident reports table */}
      <Card style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}>
        <Text style={styles.cardTitle}>Recent Accident Reports</Text>
        <View style={[styles.tableRow, styles.tableHead]}>
          <Text style={[styles.th, { flex: 2 }]}>ID</Text>
          <Text style={[styles.th, { flex: 2 }]}>Location</Text>
          <Text style={[styles.th, { flex: 1 }]}>Severity</Text>
        </View>
        {recentReports.map((r) => (
          <View key={r.id} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>{r.id}</Text>
            <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>{r.location}</Text>
            <View style={{ flex: 1 }}>
              <SeverityBadge severity={r.severity} />
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  h1: { color: colors.text, fontSize: 22, fontWeight: '700' },
  dateChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 10, paddingVertical: 6 },
  dateChipText: { color: colors.textSecondary, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridItem: { width: '47.8%', flexGrow: 1 },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: spacing.md },
  mapWrap: { height: 220, borderRadius: radius.md, overflow: 'hidden', backgroundColor: '#0E1117' },
  map: { flex: 1 },
  mapFallback: { flex: 1, backgroundColor: '#10131C' },
  blip: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  blipText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  legend: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  legendLabel: { color: colors.textMuted, fontSize: 11 },
  legendBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  riskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, gap: spacing.md },
  rank: { color: colors.textMuted, fontSize: 13, width: 16 },
  riskName: { color: colors.text, fontSize: 14, fontWeight: '500' },
  riskSub: { color: colors.textMuted, fontSize: 11 },
  riskScore: { color: colors.primaryLight, fontSize: 16, fontWeight: '700' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  tableHead: { borderBottomColor: colors.border },
  th: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  td: { color: colors.textSecondary, fontSize: 12 },
});
