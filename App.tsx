import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PreSignupLandingScreen from './src/components/preSignup/PreSignupLandingScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <PreSignupLandingScreen />
    </SafeAreaProvider>
  );
}
