import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen, Card, SeverityBadge } from '../components';
import { colors, spacing } from '../theme';
import { fetchRecentAccidents } from '../services/accidentService';
import { recentReports as fallback } from '../data/mockData';

export default function ReportsScreen() {
  const [data, setData] = useState(fallback);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const live = await fetchRecentAccidents(25);
          if (live.length)
            setData(
              live.map((d) => ({
                id: d.reportId || d.id,
                location: d.location?.name || 'Unknown',
                date: d.occurredAt?.toDate ? d.occurredAt.toDate().toLocaleString() : '',
                severity: d.severity,
                type: d.accidentType,
              }))
            );
        } catch (_) {}
      })();
    }, [])
  );

  return (
    <Screen edges={['top']}>
      <Text style={styles.h1}>All Reports</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <MaterialCommunityIcons name="car-emergency" size={22} color={colors.primaryLight} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.loc}>{item.location}</Text>
              <Text style={styles.meta}>{item.id} · {item.date}</Text>
            </View>
            <SeverityBadge severity={item.severity} />
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { color: colors.text, fontSize: 22, fontWeight: '700', paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  loc: { color: colors.text, fontSize: 14, fontWeight: '500' },
  meta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
});
