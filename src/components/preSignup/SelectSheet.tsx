import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SelectOption } from '../../types/preSignup';

type SelectSheetProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  searchable?: boolean;
};

export function SelectSheet({
  visible,
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
  onClose,
  searchable = true,
}: SelectSheetProps) {
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!query.trim()) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()));
  }, [options, query]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(15, 23, 42, 0.4)' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
        <View
          style={{
            maxHeight: '82%',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            backgroundColor: '#ffffff',
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: 32,
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              width: 56,
              height: 5,
              borderRadius: 999,
              backgroundColor: '#cbd5e1',
              marginBottom: 18,
            }}
          />
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#0f172a' }}>{title}</Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: '#64748b', marginTop: 6 }}>{subtitle}</Text>
          {searchable ? (
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor="#94a3b8"
              style={{
                marginTop: 18,
                borderWidth: 1,
                borderColor: '#cbd5e1',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 15,
                color: '#0f172a',
                backgroundColor: '#f8fafc',
              }}
            />
          ) : null}
          <ScrollView style={{ marginTop: 16 }} showsVerticalScrollIndicator={false}>
            {filteredOptions.map((option) => {
              const selected = option.value === selectedValue;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    setQuery('');
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: selected ? '#0f766e' : '#e2e8f0',
                    backgroundColor: selected ? '#f0fdfa' : '#ffffff',
                    borderRadius: 18,
                    paddingHorizontal: 16,
                    paddingVertical: 15,
                    marginBottom: 12,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: '#0f172a' }}>{option.label}</Text>
                      {option.description ? (
                        <Text style={{ fontSize: 13, lineHeight: 18, color: '#64748b', marginTop: 4 }}>
                          {option.description}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        borderRadius: 999,
                        backgroundColor: option.supported === false ? '#fef2f2' : '#ecfeff',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}
                    >
                      <Text
                        style={{
                          color: option.supported === false ? '#b91c1c' : '#0f766e',
                          fontSize: 12,
                          fontWeight: '700',
                        }}
                      >
                        {option.supported === false ? 'Update me' : selected ? 'Selected' : 'Available'}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
