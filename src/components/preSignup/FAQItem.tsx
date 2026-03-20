import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FAQItem as FAQItemType } from '../../types/preSignup';

export function FAQItem({ item }: { item: FAQItemType }) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => setOpen((prev) => !prev)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        paddingHorizontal: 18,
        paddingVertical: 18,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: '#0f172a' }}>{item.question}</Text>
        <Text style={{ fontSize: 22, color: '#0f766e', fontWeight: '300' }}>{open ? '−' : '+'}</Text>
      </View>
      {open ? (
        <Text style={{ marginTop: 12, color: '#475569', fontSize: 14, lineHeight: 22 }}>{item.answer}</Text>
      ) : null}
    </Pressable>
  );
}
