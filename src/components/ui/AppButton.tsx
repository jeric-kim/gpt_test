import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  fullWidth,
  style,
}: AppButtonProps) {
  const palette = {
    primary: {
      backgroundColor: disabled ? '#94a3b8' : '#0f766e',
      color: '#ffffff',
      borderColor: disabled ? '#94a3b8' : '#0f766e',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#0f172a',
      borderColor: '#cbd5e1',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#0f766e',
      borderColor: 'transparent',
    },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        minHeight: 52,
        borderRadius: 18,
        borderWidth: variant === 'ghost' ? 0 : 1,
        borderColor: palette.borderColor,
        backgroundColor: palette.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
        opacity: pressed ? 0.92 : 1,
        width: fullWidth ? '100%' : undefined,
        flexDirection: 'row',
        gap: 8,
        ...(style || {}),
      })}
    >
      {loading ? <ActivityIndicator color={palette.color} /> : null}
      <Text style={{ color: palette.color, fontSize: 16, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
