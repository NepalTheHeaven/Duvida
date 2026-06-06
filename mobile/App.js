import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ReportProvider } from './src/context/ReportContext';
import { colors } from './src/theme';

import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SupervisorDashboard from './src/screens/SupervisorDashboard';
import ReportStep1Screen from './src/screens/ReportStep1Screen';
import ReportStep2Screen from './src/screens/ReportStep2Screen';
import ReportSubmittedScreen from './src/screens/ReportSubmittedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, card: colors.surface, border: colors.border, text: colors.text, primary: colors.primary },
};

/* Floating center "+" tab button */
const CenterButton = ({ onPress }) => (
  <TouchableOpacity style={styles.centerWrap} activeOpacity={0.85} onPress={onPress}>
    <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.center}>
      <Ionicons name="add" size={28} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarIcon: ({ color, size }) => {
          const map = { Home: 'home', Reports: 'document-text', Dashboard: 'map', Profile: 'person' };
          return <Ionicons name={`${map[route.name]}-outline`} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Dashboard" component={SupervisorDashboard} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <Stack.Screen name="Tabs">
        {({ navigation }) => (
          <View style={{ flex: 1 }}>
            <MainTabs />
            {/* center + overlay button that opens the report flow */}
            <CenterButton onPress={() => navigation.navigate('Report')} />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Report" component={ReportStep1Screen} />
      <Stack.Screen name="ReportStep2" component={ReportStep2Screen} />
      <Stack.Screen name="ReportSubmitted" component={ReportSubmittedScreen} />
    </Stack.Navigator>
  );
}

function Root() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      {user ? (
        <AuthedStack />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AuthProvider>
        <ReportProvider>
          <Root />
        </ReportProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  tabBar: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: Platform.OS === 'ios' ? 86 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
  },
  centerWrap: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: Platform.OS === 'ios' ? 44 : 30,
  },
  center: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', elevation: 6 },
});
