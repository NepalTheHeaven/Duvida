import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Card } from '../components';
import { colors, spacing, radius } from '../theme';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/accidentService';

export default function ProfileScreen() {
  const { user } = useAuth();
  const name = user?.displayName || user?.email?.split('@')[0] || 'Officer';

  return (
    <Screen edges={['top']}>
      <View style={styles.container}>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.avatar}>
          <Text style={styles.initial}>{name[0]?.toUpperCase()}</Text>
        </LinearGradient>
        <Text style={styles.name}>Officer {name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Card style={{ width: '100%', marginTop: spacing.xl }}>
          {['Account Settings', 'Notification Preferences', 'Help & Support'].map((t) => (
            <TouchableOpacity key={t} style={styles.menuRow}>
              <Text style={styles.menuText}>{t}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <Ionicons name="log-out-outline" size={18} color={colors.fatal} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: spacing.xl },
  avatar: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
  initial: { color: '#fff', fontSize: 36, fontWeight: '700' },
  name: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: spacing.lg },
  email: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { color: colors.text, fontSize: 14 },
  logout: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 'auto', padding: spacing.lg },
  logoutText: { color: colors.fatal, fontSize: 15, fontWeight: '600' },
});
