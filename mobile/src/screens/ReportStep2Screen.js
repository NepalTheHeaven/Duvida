import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Screen, PrimaryButton, SecondaryButton, StepIndicator, Field } from '../components';
import Dropdown from '../components/Dropdown';
import { colors, spacing, radius } from '../theme';
import { useReport } from '../context/ReportContext';
import { submitAccident } from '../services/accidentService';

const ROAD = ['Normal', 'Wet', 'Icy', 'Under Construction', 'Damaged'];
const WEATHER = ['Clear', 'Rainy', 'Foggy', 'Cloudy', 'Windy'];

export default function ReportStep2Screen({ navigation }) {
  const { report, update, reset } = useReport();
  const [busy, setBusy] = useState(false);

  const changeVehicles = (delta) =>
    update({ vehiclesInvolved: Math.max(1, report.vehiclesInvolved + delta) });

  const addPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Allow photo access to attach images.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
    if (!res.canceled) update({ photos: [...report.photos, res.assets[0].uri] });
  };

  const submit = async () => {
    try {
      setBusy(true);
      const reportId = await submitAccident(report);
      reset();
      navigation.replace('ReportSubmitted', { reportId });
    } catch (e) {
      Alert.alert('Submission failed', e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 22 }}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report New Accident</Text>
        <View style={{ width: 22 }} />
      </View>

      <StepIndicator current={2} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.section}>Additional Information</Text>

        <Field label="Vehicles Involved">
          <View style={styles.stepper}>
            <Text style={styles.stepperValue}>{report.vehiclesInvolved}</Text>
            <View style={styles.stepperBtns}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => changeVehicles(-1)}>
                <Ionicons name="remove" size={18} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.stepBtn, styles.stepBtnPrimary]} onPress={() => changeVehicles(1)}>
                <Ionicons name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Field>

        <Field label="Road Condition">
          <Dropdown value={report.roadCondition} options={ROAD} onChange={(v) => update({ roadCondition: v })} />
        </Field>

        <Field label="Weather Condition">
          <Dropdown value={report.weatherCondition} options={WEATHER} onChange={(v) => update({ weatherCondition: v })} />
        </Field>

        <Field label="Upload Photos (Optional)">
          <View style={styles.photoRow}>
            {report.photos.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.photo} />
            ))}
            <TouchableOpacity style={styles.addPhoto} onPress={addPhoto}>
              <Ionicons name="add" size={26} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </Field>
      </ScrollView>

      <View style={styles.footer}>
        <SecondaryButton title="Back" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
        <PrimaryButton title="Next" loading={busy} onPress={submit} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  section: { color: colors.text, fontSize: 16, fontWeight: '700', marginVertical: spacing.md },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: 10 },
  stepperValue: { color: colors.text, fontSize: 16, fontWeight: '600' },
  stepperBtns: { flexDirection: 'row', gap: spacing.md },
  stepBtn: { width: 34, height: 34, borderRadius: 8, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  stepBtnPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  photoRow: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  photo: { width: 72, height: 72, borderRadius: radius.md },
  addPhoto: { width: 72, height: 72, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.inputBg },
  footer: { flexDirection: 'row', gap: spacing.md, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
});
