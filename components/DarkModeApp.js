import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

export default function DarkModeApp() {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    bg:      isDark ? '#1a1a2e' : '#ffffff',
    card:    isDark ? '#16213e' : '#f8f9fa',
    text:    isDark ? '#e0e0e0' : '#2d3436',
    subtext: isDark ? '#b2bec3' : '#636e72',
    accent:  isDark ? '#55efc4' : '#00b894',
    border:  isDark ? '#2d3436' : '#dfe6e9',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Text>
        <Switch 
          value={isDark} 
          onValueChange={val => setIsDark(val)}
          trackColor={{ false: '#dfe6e9', true: '#00b894' }}
          thumbColor={isDark ? '#55efc4' : '#fff'}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.accent }]}>Berita Terkini</Text>
        {['Expo SDK 52 Dirilis!', 'React Native 0.76 Stabil', 'Hermes Engine Makin Kencang'].map((item, index) => (
          <View key={index} style={[styles.newsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.newsTitle, { color: theme.text }]}>📰 {item}</Text>
            <Text style={[styles.newsMeta, { color: theme.subtext }]}>2 jam yang lalu</Text>
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.toggleBtn, { backgroundColor: theme.accent }]} 
          onPress={() => setIsDark(prev => !prev)}
        >
          <Text style={styles.toggleBtnText}>
            {isDark ? '🌤 Switch ke Light' : '🌙 Switch ke Dark'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 55, paddingBottom: 15, borderBottomWidth: 1 },
  headerTitle:  { fontSize: 20, fontWeight: '800' },
  content:      { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, textTransform: 'uppercase' },
  newsCard:     { borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1 },
  newsTitle:    { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  newsMeta:     { fontSize: 12 },
  toggleBtn:    { borderRadius: 25, padding: 14, alignItems: 'center', marginTop: 10 },
  toggleBtnText:{ color: '#000', fontWeight: '800', fontSize: 15 },
});