import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, PrimaryButton, SecondaryButton } from '../components';
import { colors, spacing, radius } from '../theme';
import { recommendations } from '../data/mockData';

const priorityColor = (p) =>
  p.startsWith('High') ? colors.fatal : p.startsWith('Medium') ? colors.serious : colors.minor;

export default function DeploymentScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h1}>Deployment Recommendations</Text>
        <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
      </View>

      {recommendations.map((r) => {
        const pc = priorityColor(r.priority);
        return (
          <Card key={r.id} style={styles.recCard}>
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.loc}>{r.location}</Text>
                <Text style={styles.sub}>Risk Score</Text>
              </View>
              <View style={[styles.priority, { backgroundColor: pc + '22', borderColor: pc + '55' }]}>
                <Text style={[styles.priorityText, { color: pc }]}>{r.priority}</Text>
              </View>
            </View>

            <Text style={styles.score}>{r.score}</Text>
            <Text style={styles.note}>{r.note}</Text>

            <Text style={styles.actionLabel}>Recommended Action</Text>
            <Text style={styles.action}>{r.action}</Text>

            <PrimaryButton title="View on Map" style={{ marginTop: spacing.md }} onPress={() => {}} />
          </Card>
        );
      })}

      <SecondaryButton title="View All Recommendations" style={{ marginBottom: spacing.xxl }} onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  h1: { color: colors.text, fontSize: 18, fontWeight: '700', flex: 1 },
  recCard: { marginBottom: spacing.lg },
  topRow: { flexDirection: 'row', alignItems: 'flex-start' },
  loc: { color: colors.text, fontSize: 15, fontWeight: '600' },
  sub: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  priority: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, borderWidth: 1 },
  priorityText: { fontSize: 11, fontWeight: '600' },
  score: { color: colors.text, fontSize: 32, fontWeight: '800', marginTop: spacing.sm },
  note: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  actionLabel: { color: colors.text, fontSize: 13, fontWeight: '600', marginTop: spacing.md },
  action: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 19 },
});
