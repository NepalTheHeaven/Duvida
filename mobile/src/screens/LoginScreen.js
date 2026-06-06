import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen, PrimaryButton, SecondaryButton, Segmented, Field } from '../components';
import { colors, spacing, radius } from '../theme';
import { login, register } from '../services/accidentService';

const ROLE_OPTIONS = [
  { label: 'Officer', value: 'officer' },
  { label: 'Supervisor', value: 'supervisor' },
];

export default function LoginScreen() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('officer');
  const [busy, setBusy] = useState(false);

  const validate = () => {
    if (mode === 'register' && !name.trim()) {
      Alert.alert('Missing details', 'Please enter your full name.');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Missing details', 'Please enter your email address.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return false;
    }
    if (!password) {
      Alert.alert('Missing details', 'Please enter your password.');
      return false;
    }
    if (mode === 'register' && password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setBusy(true);
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password, role);
      }
      // Navigation happens automatically via the auth state listener in App.js
    } catch (e) {
      Alert.alert('Authentication failed', e.message);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setName('');
    setEmail('');
    setPassword('');
    setRole('officer');
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.logoWrap}>
            <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.logo}>
              <MaterialCommunityIcons name="shield-car" size={40} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Traffic Intelligence{'\n'}& Deployment System</Text>
          <Text style={styles.subtitle}>
            Smart tools for traffic officers.{'\n'}Safer roads for everyone.
          </Text>

          <View style={styles.form}>
            {mode === 'register' && (
              <>
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
                <Field label="Role">
                  <Segmented options={ROLE_OPTIONS} value={role} onChange={setRole} />
                </Field>
              </>
            )}

            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <PrimaryButton
              title={mode === 'login' ? 'Login' : 'Create Account'}
              onPress={submit}
              loading={busy}
              style={{ marginTop: spacing.sm }}
            />
            <SecondaryButton
              title={mode === 'login' ? 'Create Account' : 'Back to Login'}
              onPress={switchMode}
              style={{ marginTop: spacing.md }}
            />
          </View>

          <Text style={styles.version}>v1.0.0</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, alignItems: 'center' },
  logoWrap: { marginTop: spacing.xl, marginBottom: spacing.lg },
  logo: { width: 76, height: 76, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center', lineHeight: 30 },
  subtitle: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md, lineHeight: 20 },
  form: { width: '100%', marginTop: spacing.xxl },
  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  version: { color: colors.textMuted, fontSize: 12, marginTop: 'auto', paddingVertical: spacing.xl },
});
