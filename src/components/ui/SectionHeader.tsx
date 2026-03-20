import React from 'react';
import { Text, View } from 'react-native';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <View style={{ alignItems: centered ? 'center' : 'flex-start', gap: 10 }}>
      {eyebrow ? (
        <View
          style={{
            backgroundColor: '#e0f2fe',
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: '#0369a1', fontSize: 12, fontWeight: '700', letterSpacing: 0.3 }}>
            {eyebrow}
          </Text>
        </View>
      ) : null}
      <Text
        style={{
          color: '#0f172a',
          fontSize: centered ? 28 : 26,
          lineHeight: centered ? 34 : 32,
          fontWeight: '800',
          textAlign: centered ? 'center' : 'left',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#475569',
          fontSize: 15,
          lineHeight: 22,
          textAlign: centered ? 'center' : 'left',
          maxWidth: 680,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
