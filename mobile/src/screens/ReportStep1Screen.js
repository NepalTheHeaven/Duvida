import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, PrimaryButton, StepIndicator, Segmented, Field } from '../components';
import Dropdown from '../components/Dropdown';
import { colors, spacing, radius } from '../theme';
import { useReport } from '../context/ReportContext';

const ACCIDENT_TYPES = ['Collision', 'Skidding', 'Pedestrian', 'Rollover', 'Hit and Run', 'Other'];
const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const fmtTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export default function ReportStep1Screen({ navigation }) {
  const { report, update } = useReport();

  return (
    <Screen edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report New Accident</Text>
        <View style={{ width: 22 }} />
      </View>

      <StepIndicator current={1} />

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.section}>Accident Details</Text>

        <Field label="Accident Type">
          <Dropdown
            placeholder="Select Type"
            value={report.accidentType}
            options={ACCIDENT_TYPES}
            onChange={(v) => update({ accidentType: v })}
          />
        </Field>

        <Field label="Severity">
          <Segmented
            value={report.severity}
            onChange={(v) => update({ severity: v })}
            options={[
              { label: 'Minor', value: 'minor' },
              { label: 'Serious', value: 'serious' },
              { label: 'Fatal', value: 'fatal' },
            ]}
          />
        </Field>

        <Field label="Date & Time">
          <View style={styles.dateRow}>
            <View style={[styles.pill, { flex: 1.4 }]}>
              <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
              <Text style={styles.pillText}>{fmtDate(report.occurredAt)}</Text>
            </View>
            <View style={[styles.pill, { flex: 1 }]}>
              <Ionicons name="time-outline" size={16} color={colors.textMuted} />
              <Text style={styles.pillText}>{fmtTime(report.occurredAt)}</Text>
            </View>
          </View>
        </Field>

        <Field label="Location">
          <View style={styles.locationBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.locName}>{report.location.name}</Text>
              <Text style={styles.locCoords}>
                Lat: {report.location.lat}, Lng: {report.location.lng}
              </Text>
            </View>
            <Ionicons name="location" size={20} color={colors.primary} />
          </View>
        </Field>

        <Field label="Description">
          <View style={styles.textareaWrap}>
            <TextInput
              placeholder="Enter accident description..."
              placeholderTextColor={colors.textMuted}
              value={report.description}
              onChangeText={(t) => t.length <= 250 && update({ description: t })}
              multiline
              style={styles.textarea}
            />
            <Text style={styles.counter}>{report.description.length}/250</Text>
          </View>
        </Field>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Next" onPress={() => navigation.navigate('ReportStep2')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  back: { width: 22 },
  headerTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  section: { color: colors.text, fontSize: 16, fontWeight: '700', marginVertical: spacing.md },
  dateRow: { flexDirection: 'row', gap: spacing.md },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: 14 },
  pillText: { color: colors.text, fontSize: 14 },
  locationBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg },
  locName: { color: colors.text, fontSize: 14, fontWeight: '500' },
  locCoords: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  textareaWrap: { backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  textarea: { color: colors.text, fontSize: 14, minHeight: 70, textAlignVertical: 'top' },
  counter: { color: colors.textMuted, fontSize: 11, alignSelf: 'flex-end' },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
});
