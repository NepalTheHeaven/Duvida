import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen, PrimaryButton } from '../components';
import { colors, spacing } from '../theme';

export default function LandingScreen({ navigation }) {
  return (
    <Screen>
      <LinearGradient colors={[colors.bgGradientTop, colors.bg]} style={styles.fill}>
        <View style={styles.content}>
          {/* Brand mark */}
          <View style={styles.logoWrap}>
            <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.logo}>
              <MaterialCommunityIcons name="shield-car" size={40} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Traffic Intelligence &{'\n'}Deployment Support System</Text>
          <Text style={styles.subtitle}>
            Turning accident data into actionable intelligence for safer roads and smarter deployment.
          </Text>

          {/* Decorative map-pin graphic */}
          <View style={styles.pinArea}>
            <Ionicons name="location" size={72} color={colors.primary} />
            <View style={styles.network}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={[styles.node, { left: 20 + i * 38, top: (i % 3) * 22 }]} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton title="Get Started" onPress={() => navigation.replace('Login')} />
        </View>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, paddingHorizontal: spacing.xl },
  content: { flex: 1, justifyContent: 'center' },
  logoWrap: { marginBottom: spacing.xl },
  logo: { width: 76, height: 76, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, lineHeight: 34 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: spacing.md, lineHeight: 22 },
  pinArea: { height: 160, marginTop: spacing.xxl, justifyContent: 'center' },
  network: { position: 'absolute', opacity: 0.4 },
  node: { position: 'absolute', width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primaryLight },
  footer: { paddingBottom: spacing.xl },
});
