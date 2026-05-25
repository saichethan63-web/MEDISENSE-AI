import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  DMSans_800ExtraBold,
  DMSans_900Black,
} from '@expo-google-fonts/dm-sans';
import {
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from '@expo-google-fonts/dm-serif-display';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { Colors, Font } from './src/utils/theme';

// Screens
import SplashScreenUI  from './src/screens/SplashScreen';
import LoginScreen     from './src/screens/LoginScreen';
import SignupScreen    from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SOSScreen       from './src/screens/SOSScreen';
import ChatScreen      from './src/screens/ChatScreen';
import ProfileScreen   from './src/screens/ProfileScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor:   Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontFamily: Font.bold, fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon icon="🚨" color={color} />, tabBarLabel: 'Emergency' }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon icon="🤖" color={color} />, tabBarLabel: 'AI Triage' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />, tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 20 }}>{icon}</Text>;
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={s.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash"     component={SplashScreenUI} />
          <Stack.Screen name="Login"      component={LoginScreen}    />
          <Stack.Screen name="Signup"     component={SignupScreen}   />
        </>
      ) : (
        <>
          <Stack.Screen name="Main"       component={MainTabs}       />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    DMSans_800ExtraBold,
    DMSans_900Black,
    DMSerifDisplay_400Regular,
    DMSerifDisplay_400Regular_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const s = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryDark },
});
