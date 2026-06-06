import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen, PrimaryButton, SecondaryButton, StepIndicator } from '../components';
import { colors, spacing, radius } from '../theme';

export default function ReportSubmittedScreen({ navigation, route }) {
  const reportId = route.params?.reportId || 'ACC-2025-000128';

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report New Accident</Text>
      </View>

      <StepIndicator current={3} />

      <View style={styles.body}>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.check}>
          <Ionicons name="checkmark" size={56} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>Report Submitted!</Text>
        <Text style={styles.subtitle}>
          Thank you for your report.{'\n'}Your report has been recorded successfully.
        </Text>

        <View style={styles.idCard}>
          <MaterialCommunityIcons name="file-document-outline" size={22} color={colors.primaryLight} />
          <View style={{ marginLeft: spacing.md }}>
            <Text style={styles.idLabel}>Report ID</Text>
            <Text style={styles.idValue}>{reportId}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="View Report"
          onPress={() => navigation.navigate('Reports')}
          style={{ marginBottom: spacing.md }}
        />
        <SecondaryButton
          title="Back to Home"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: spacing.md },
  headerTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  check: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 14, textAlign: 'center', marginTop: spacing.md, lineHeight: 21 },
  idCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.xxl, width: '100%' },
  idLabel: { color: colors.textMuted, fontSize: 12 },
  idValue: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 2 },
  footer: { padding: spacing.lg },
});
