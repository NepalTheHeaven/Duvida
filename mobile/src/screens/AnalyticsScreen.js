import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Card } from '../components';
import { colors, spacing, radius } from '../theme';
import {
  accidentsOverTime,
  accidentsByHour,
  accidentsByDay,
  severityBreakdown,
} from '../data/mockData';

const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  decimalPlaces: 0,
  color: (o = 1) => `rgba(139, 92, 246, ${o})`,
  labelColor: () => colors.textMuted,
  propsForDots: { r: '4', strokeWidth: '2', stroke: colors.primaryLight },
  propsForBackgroundLines: { stroke: colors.border },
  barPercentage: 0.6,
  fillShadowGradient: colors.primary,
  fillShadowGradientOpacity: 0.5,
};

const ChartCard = ({ title, control, children }) => (
  <Card style={{ marginBottom: spacing.lg }}>
    <View style={styles.head}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chip}>
        <Text style={styles.chipText}>{control}</Text>
        <Ionicons name="chevron-down" size={13} color={colors.textMuted} />
      </View>
    </View>
    {children}
  </Card>
);

export default function AnalyticsScreen() {
  const w = Math.min(Dimensions.get('window').width, 640) - spacing.lg * 2 - spacing.lg * 2;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Analytics</Text>

      <ChartCard title="Accidents Over Time" control="Daily">
        <LineChart
          data={{ labels: accidentsOverTime.labels, datasets: [{ data: accidentsOverTime.data }] }}
          width={w}
          height={200}
          chartConfig={chartConfig}
          bezier
          withInnerLines
          style={styles.chart}
        />
      </ChartCard>

      <ChartCard title="Accidents by Time of Day" control="By Hour">
        <BarChart
          data={{ labels: accidentsByHour.labels, datasets: [{ data: accidentsByHour.data }] }}
          width={w}
          height={200}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars={false}
          style={styles.chart}
        />
      </ChartCard>

      <ChartCard title="Accidents by Day of Week" control="By Day">
        <BarChart
          data={{ labels: accidentsByDay.labels, datasets: [{ data: accidentsByDay.data }] }}
          width={w}
          height={200}
          chartConfig={chartConfig}
          fromZero
          style={styles.chart}
        />
      </ChartCard>

      <Card style={{ marginBottom: spacing.xxl }}>
        <Text style={styles.title}>Accidents by Severity</Text>
        <View style={styles.severityWrap}>
          <PieChart
            data={severityBreakdown.map((s) => ({
              name: s.name,
              population: s.count,
              color: s.color,
              legendFontColor: colors.textSecondary,
              legendFontSize: 12,
            }))}
            width={w}
            height={170}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            hasLegend={false}
            center={[w / 4, 0]}
          />
          <View style={styles.legendList}>
            {severityBreakdown.map((s) => (
              <View key={s.name} style={styles.legendRow}>
                <View style={[styles.swatch, { backgroundColor: s.color }]} />
                <Text style={styles.legendName}>{s.name}</Text>
                <Text style={styles.legendVal}>{s.pct} ({s.count})</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  h1: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: spacing.lg },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  title: { color: colors.text, fontSize: 15, fontWeight: '600' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 9, paddingVertical: 5 },
  chipText: { color: colors.textSecondary, fontSize: 11 },
  chart: { borderRadius: radius.md, marginLeft: -spacing.sm },
  severityWrap: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  legendList: { position: 'absolute', right: 0, gap: spacing.md },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 10, height: 10, borderRadius: 5 },
  legendName: { color: colors.text, fontSize: 12, width: 54 },
  legendVal: { color: colors.textMuted, fontSize: 12 },
});
