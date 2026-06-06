import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius, spacing, severityColor } from '../theme';

/* Screen wrapper with the dark gradient background */
export const Screen = ({ children, style, edges = ['top', 'bottom'] }) => (
  <SafeAreaView style={styles.safe} edges={edges}>
    <View style={[styles.screen, style]}>{children}</View>
  </SafeAreaView>
);

/* Primary gradient button */
export const PrimaryButton = ({ title, onPress, loading, disabled, style, icon }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    disabled={disabled || loading}
    style={[{ borderRadius: radius.md, overflow: 'hidden', opacity: disabled ? 0.5 : 1 }, style]}
  >
    <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.btn}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.btnRow}>
          {icon}
          <Text style={styles.btnText}>{title}</Text>
        </View>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

/* Outlined secondary button */
export const SecondaryButton = ({ title, onPress, style }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.secondaryBtn, style]}>
    <Text style={styles.secondaryText}>{title}</Text>
  </TouchableOpacity>
);

/* Generic card surface */
export const Card = ({ children, style, highlight }) => (
  <View style={[styles.card, highlight && styles.cardHighlight, style]}>{children}</View>
);

/* Small stat card used on dashboards */
export const StatCard = ({ label, value, delta, positive, style }) => (
  <View style={[styles.statCard, style]}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {delta ? (
      <Text style={[styles.statDelta, { color: positive ? colors.success : colors.fatal }]}>
        {delta} from last month
      </Text>
    ) : null}
  </View>
);

/* 1 - 2 - 3 step indicator for the report flow */
export const StepIndicator = ({ current = 1, total = 3 }) => (
  <View style={styles.stepRow}>
    {Array.from({ length: total }).map((_, i) => {
      const step = i + 1;
      const active = step <= current;
      return (
        <React.Fragment key={step}>
          <View style={[styles.stepDot, active && styles.stepDotActive]}>
            <Text style={[styles.stepNum, active && { color: '#fff' }]}>{step}</Text>
          </View>
          {step < total && <View style={[styles.stepLine, step < current && styles.stepLineActive]} />}
        </React.Fragment>
      );
    })}
  </View>
);

/* Colored status pill (minor / serious / fatal) */
export const SeverityBadge = ({ severity }) => {
  const c = severityColor(severity);
  const label = severity ? severity[0].toUpperCase() + severity.slice(1) : '';
  return (
    <View style={[styles.badge, { backgroundColor: c + '22', borderColor: c + '55' }]}>
      <Text style={[styles.badgeText, { color: c }]}>{label}</Text>
    </View>
  );
};

/* Segmented control e.g. Minor | Serious | Fatal */
export const Segmented = ({ options, value, onChange }) => (
  <View style={styles.segment}>
    {options.map((opt) => {
      const selected = value === opt.value;
      return (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          activeOpacity={0.8}
          style={[styles.segmentItem, selected && styles.segmentItemActive]}
        >
          <Text style={[styles.segmentText, selected && { color: '#fff', fontWeight: '600' }]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

/* Form field label + input shell */
export const Field = ({ label, children }) => (
  <View style={{ marginBottom: spacing.lg }}>
    {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
    {children}
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  screen: { flex: 1, backgroundColor: colors.bg },
  btn: { paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
  btnRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  secondaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryText: { color: colors.primaryLight, fontSize: 15, fontWeight: '600' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHighlight: { backgroundColor: colors.cardHighlight, borderColor: colors.primary + '55' },
  statCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 6 },
  statValue: { color: colors.text, fontSize: 24, fontWeight: '700' },
  statDelta: { fontSize: 11, marginTop: 6 },
  stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border,
  },
  stepDotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepNum: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  stepLine: { width: 48, height: 2, backgroundColor: colors.border, marginHorizontal: 6 },
  stepLineActive: { backgroundColor: colors.primary },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  segment: { flexDirection: 'row', backgroundColor: colors.inputBg, borderRadius: radius.md, padding: 4, gap: 4 },
  segmentItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: radius.sm },
  segmentItemActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textSecondary, fontSize: 13 },
  fieldLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 8 },
});

export default {
  Screen, PrimaryButton, SecondaryButton, Card, StatCard,
  StepIndicator, SeverityBadge, Segmented, Field,
};
